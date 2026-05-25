"use client";
import { useState, useCallback, useContext, useEffect, useRef, useMemo } from "react";
import { isString, get, isObject, uniqBy } from "lodash-es";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useSignalR } from "@/hooks/useSignalR";
import { useApi } from "@/hooks/useApi";
import { formatTime, delay } from "@/Utils/Func/Common";
import { useMainNotify } from "@/hooks/common";

const INVALID_SESSION_ID = "00000000-0000-0000-0000-000000000000";

const parseQuestion = (q) => {
  if (!q) return null;
  try {
    return isString(q) ? JSON.parse(q) : q;
  } catch (e) {
    return q;
  }
};

const useTimerLogic = (isSessionStarted, currentQuestion, isSubmitting, interviewFinished, sessionId, questionIndex) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [initialTime, setInitialTime] = useState(0);
  const timeLeftRef = useRef(null);
  const initialTimeRef = useRef(0);

  useEffect(() => {
    const parsed = parseQuestion(currentQuestion);
    if (!parsed || !sessionId) {
      setTimeLeft(null);
      return;
    }

    const storageKey = `timer_${sessionId}_${questionIndex}`;
    const savedEndTime = localStorage.getItem(storageKey);
    const now = Date.now();

    if (savedEndTime) {
      const remaining = Math.round((parseInt(savedEndTime, 10) - now) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
        timeLeftRef.current = remaining;
        let totalSec = parseInt(get(parsed, "remainingSeconds"), 10);
        if (isNaN(totalSec)) totalSec = (parseInt(get(parsed, "time"), 10) || 0) * 60;
        setInitialTime(totalSec);
        initialTimeRef.current = totalSec;
        return;
      }
    }

    let seconds = parseInt(get(parsed, "remainingSeconds"), 10);
    if (isNaN(seconds)) {
      const minutes = parseInt(get(parsed, "time"), 10);
      seconds = !isNaN(minutes) ? minutes * 60 : 0;
    }

    if (seconds > 0) {
      const endTime = now + seconds * 1000;
      localStorage.setItem(storageKey, String(endTime));
    }

    setTimeLeft(seconds);
    setInitialTime(seconds);
    timeLeftRef.current = seconds;
    initialTimeRef.current = seconds;
  }, [currentQuestion, sessionId, questionIndex]);

  useEffect(() => {
    if (!isSessionStarted || timeLeft === null || timeLeft <= 0 || interviewFinished || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        const next = t > 0 ? t - 1 : 0;
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSessionStarted, timeLeft, interviewFinished, isSubmitting]);

  return { timeLeft, initialTime, timeLeftRef, initialTimeRef };
};


export const useInterviewSession = (jobId) => {
  const { userToken } = useContext(UserTokenContext);
  const { userId } = useUserAccount();
  const { success, error: notifyError } = useMainNotify();

  const [sessionId, setSessionId] = useState(null);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [finishMessage, setFinishMessage] = useState("");
  const [error, setError] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [loadingStates, setLoadingStates] = useState({
    session: true,
    submitting: false,
    finishing: false,
  });

  const submittingRef = useRef(false);

  const { isConnected, on } = useSignalR(userToken, userId);
  
  const { refetch: callStartSession } = useApi({ type: "startSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callNextQuestion } = useApi({ type: "nextQuestion", autoFetch: false });
  const { refetch: callEndSession } = useApi({ type: "endSession", autoFetch: false });
  const { refetch: callCheckActiveSession } = useApi({ type: "checkActiveSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callGetSessionDetails } = useApi({ type: "getSessionDetails", autoFetch: false });

  const { timeLeft, initialTimeRef, timeLeftRef } = useTimerLogic(
    isSessionStarted, 
    currentQuestion, 
    loadingStates.submitting, 
    interviewFinished,
    sessionId,
    questionIndex
  );

  const finishInterview = useCallback(async () => {
    if (!sessionId) return;
    setLoadingStates(prev => ({ ...prev, finishing: true }));
    try {
      await callEndSession({ urlSuffix: `/${sessionId}/${jobId}` });
      setInterviewFinished(true);
      success("Interview Finished", "Your responses have been submitted.");
      setCurrentQuestion(null);

      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`timer_${sessionId}`)) localStorage.removeItem(key);
      });
    } catch (err) {
      console.error("Finish error:", err);
    } finally {
      setLoadingStates(prev => ({ ...prev, finishing: false }));
    }
  }, [sessionId, jobId, callEndSession, success]);

  const autoSkipExpired = useCallback(async (sId, q, index) => {
    if (!sId || !q) return;
    const formData = new FormData();
    formData.append("SessionId", sId);
    formData.append("QuestionId", q.id || q.questionId);
    formData.append("currentQuestionIndex", index);
    formData.append("time", "0");
    formData.append("UserAnswer", "Time limit exceeded (Auto-recovered)");
    
    try {
      await callNextQuestion({ data: formData, silent: true });
    } catch (e) {  }
  }, [callNextQuestion]);

  const syncSession = useCallback(async (silent = false) => {
    if (!silent) setLoadingStates(prev => ({ ...prev, session: true }));
    try {
      const res = await callCheckActiveSession();
      const sId = get(res, "data.sessionid") || get(res, "data.sessionId") || get(res, "data");
      
      if (!sId || sId === INVALID_SESSION_ID || !isString(sId)) {
        if (!silent) setLoadingStates(prev => ({ ...prev, session: false }));
        return;
      }

      const detailsRes = await callGetSessionDetails({ urlSuffix: `/${sId}` });
      const data = get(detailsRes, "data");
      if (!data) return;

      const q = get(data, "question") || (get(data, "questionText") ? data : null);
      const remSec = parseInt(get(q, "remainingSeconds"), 10);
      
      if (!isNaN(remSec) && remSec <= 0) {
        await autoSkipExpired(sId, q, get(data, "index") ?? 0);
        return syncSession(silent);
      }

      setSessionId(sId);
      setIsSessionStarted(true);
      setCurrentQuestion(q);
      setQuestionIndex(get(data, "index") ?? 0);
      setTotalQuestions(get(data, "totalquestion") ?? 15);
    } catch (err) {
    } finally {
      if (!silent) setLoadingStates(prev => ({ ...prev, session: false }));
    }
  }, [callCheckActiveSession, callGetSessionDetails, autoSkipExpired]);

  const submitAnswer = useCallback(async (answerData) => {
    if (submittingRef.current || !sessionId || !currentQuestion) return;
    
    submittingRef.current = true;
    setLoadingStates(prev => ({ ...prev, submitting: true }));

    const timeTaken = initialTimeRef.current - (timeLeftRef.current || 0);
    const parsed = parseQuestion(currentQuestion);
    
    const formData = new FormData();
    formData.append("SessionId", sessionId);
    formData.append("QuestionId", get(parsed, "id") || get(parsed, "questionId"));
    formData.append("currentQuestionIndex", questionIndex);
    formData.append("time", String(timeTaken));
    
    if (answerData?.voiceFile) formData.append("voiceFile", answerData.voiceFile, "voice.wav");
    else formData.append("UserAnswer", answerData?.text || "");

    setCurrentQuestion(null);

    try {
      const result = await callNextQuestion({ data: formData });
      const response = get(result, "data");
      const nextQ = get(response, "question") || (get(response, "questionText") ? response : null);
      
      if (nextQ?.id) setCurrentQuestion(nextQ);

      const incomingIdx = get(response, "index");
      // Update question index based on server response; fallback to increment
      if (incomingIdx !== undefined) {
        setQuestionIndex(incomingIdx);
      } else {
        setQuestionIndex(prev => prev + 1);
      }

      // Determine effective index for last-question check (0‑based)
      const effectiveIdx = incomingIdx !== undefined ? incomingIdx : questionIndex + 1;
      const isCompleted = get(response, "isCompleted") || get(response, "completed");
      const isLast = (effectiveIdx + 1) >= (get(parsed, "totalquestion") || totalQuestions);

      if (isCompleted || isLast) {
        await delay(1000);
        await finishInterview();
      }
    } catch (err) {
      await syncSession(true);
    } finally {
      setLoadingStates(prev => ({ ...prev, submitting: false }));
      submittingRef.current = false;
    }
  }, [sessionId, currentQuestion, questionIndex, totalQuestions, callNextQuestion, finishInterview, syncSession]);

  const startInterview = useCallback(async () => {
    setError(null);
    setLoadingStates(prev => ({ ...prev, session: true }));
    try {
      const result = await callStartSession();
      const sId = get(result, "data.sessionId") || get(result, "data.sessionid") || get(result, "data.id") || get(result, "data");
      const finalId = isObject(sId) ? (sId.sessionId || sId.id) : sId;
      
      if (!finalId) throw new Error("Invalid Session ID");
      setSessionId(finalId);
      setIsSessionStarted(true);
      return finalId;
    } catch (err) {
      setError("Failed to start session");
    } finally {
      setLoadingStates(prev => ({ ...prev, session: false }));
    }
  }, [callStartSession]);

  useEffect(() => {
    if (jobId) syncSession();
    else setLoadingStates(prev => ({ ...prev, session: false }));
  }, [jobId, syncSession]);

  useEffect(() => {
    const termError = sessionStorage.getItem("interviewTerminatedError");
    if (termError) {
      notifyError("Session Terminated", termError);
      sessionStorage.removeItem("interviewTerminatedError");
    }
  }, [notifyError]);

  useEffect(() => {
    on("nextQuestionReady", data => {
      const incomingIndex = get(data, "index");
      if (incomingIndex !== undefined && incomingIndex >= questionIndex) {
        setCurrentQuestion(data);
        if (incomingIndex > questionIndex) setQuestionIndex(incomingIndex);
      }
    });
    on("reportGenerationStarted", data => {
      setFinishMessage(get(data, "message") || "Generating your report...");
      setInterviewFinished(true);
    });
    on("OnInterviewTerminated", data => {
      const msg = get(data, "message") || (isString(data) ? data : "Session terminated due to camera errors. You failed to show your face 10 times.");
      sessionStorage.setItem("interviewTerminatedError", msg);
      window.location.reload();
    });
  }, [on, questionIndex]);

  useEffect(() => {
    if (isSessionStarted && timeLeft === 0 && timeLeft !== null && currentQuestion && !loadingStates.submitting && !interviewFinished) {
      submitAnswer({ text: "Time limit exceeded" });
    }
  }, [timeLeft, isSessionStarted, currentQuestion, loadingStates.submitting, interviewFinished, submitAnswer]);

  const parsedCurrentQuestion = useMemo(() => parseQuestion(currentQuestion), [currentQuestion]);
  const effectiveTotalQuestions = useMemo(() => 
    get(parsedCurrentQuestion, "totalquestion") || totalQuestions || 15
  , [parsedCurrentQuestion, totalQuestions]);

  return useMemo(() => ({
    isSessionStarted,
    sessionId,
    currentQuestion: parsedCurrentQuestion,
    isConnected,
    isLoading: loadingStates.session,
    isSubmitting: loadingStates.submitting,
    isFinishing: loadingStates.finishing,
    startInterview,
    submitAnswer,
    finishInterview,
    error,
    questionIndex,
    totalQuestions: effectiveTotalQuestions,
    interviewFinished,
    finishMessage,
    isQuestionReady: !!parsedCurrentQuestion,
    timeLeft,
    isLastQuestion: (questionIndex + 1) >= effectiveTotalQuestions
  }), [
    isSessionStarted, sessionId, parsedCurrentQuestion, isConnected, loadingStates, 
    startInterview, submitAnswer, finishInterview, error, questionIndex, 
    effectiveTotalQuestions, interviewFinished, finishMessage, timeLeft
  ]);
};

export const useInterviewRoomState = (jobId) => {
  const session = useInterviewSession(jobId);
  const { currentQuestion, questionIndex, isConnected, isSessionStarted, error, isLoading, startInterview } = session;

  useEffect(() => {
    if (isConnected && !isSessionStarted && !error && !isLoading) {
      startInterview();
    }
  }, [isConnected, isSessionStarted, error, isLoading, startInterview]);

  const questionText = useMemo(() => 
    get(currentQuestion, "questionText") || get(currentQuestion, "question") || `Preparing question ${questionIndex + 1}...`
  , [currentQuestion, questionIndex]);

  const type = useMemo(() => get(currentQuestion, "type"), [currentQuestion]);
  const difficulty = useMemo(() => get(currentQuestion, "difficulty"), [currentQuestion]);
  const time = useMemo(() => get(currentQuestion, "time"), [currentQuestion]);

  const difficultyStyles = useMemo(() => ({
    hard: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/30",
    medium: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/30",
    easy: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30",
  }), []);

  const currentDiffStyle = useMemo(() => 
    difficultyStyles[difficulty?.toLowerCase()] || difficultyStyles.easy
  , [difficulty, difficultyStyles]);

  return useMemo(() => ({
    ...session,
    questionText,
    type,
    difficulty,
    time,
    currentDiffStyle,
  }), [session, questionText, type, difficulty, time, currentDiffStyle]);
};

export const useAnswerConsole = (onSubmit, questionType) => {
  const [activeTab, setActiveTab] = useState("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [codeAnswer, setCodeAnswer] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    setActiveTab(questionType?.toLowerCase() === "coding" ? "code" : "text");
  }, [questionType]);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true, blobPropertyBag: { type: "audio/wav" } });

  const handleSend = () => {
    if (activeTab === "voice" && mediaBlobUrl) {
      fetch(mediaBlobUrl).then(res => res.blob()).then(blob => {
        onSubmit({ voiceFile: blob });
        clearBlobUrl();
      });
      return;
    }
    
    let finalAnswer = activeTab === "text" ? textAnswer : codeAnswer;
    finalAnswer = finalAnswer.replace(/\/\/ Write your code here\n?/g, "").trim();

    onSubmit({ text: finalAnswer });
    setTextAnswer("");
    setCodeAnswer("// Write your code here\n");
  };

  const hasAnswer = useMemo(() => {
    if (activeTab === "voice") return !!mediaBlobUrl;
    const raw = activeTab === "text" ? textAnswer : codeAnswer;
    return raw.replace(/\/\/ Write your code here\n?/g, "").trim().length > 0;
  }, [activeTab, textAnswer, codeAnswer, mediaBlobUrl]);

  return useMemo(() => ({
    activeTab, setActiveTab, textAnswer, setTextAnswer, codeAnswer, setCodeAnswer,
    language, setLanguage, status, startRecording, stopRecording, mediaBlobUrl, handleSend, hasAnswer
  }), [activeTab, setActiveTab, textAnswer, setTextAnswer, codeAnswer, setCodeAnswer, language, setLanguage, status, startRecording, stopRecording, mediaBlobUrl, handleSend, hasAnswer]);
};

export const useInterviewSidebar = (isSessionStarted, timeLeftFromSession) => {
  const webcamRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const checkStream = setInterval(() => {
      if (webcamRef.current?.video?.srcObject) {
        setStream(webcamRef.current.video.srcObject);
        clearInterval(checkStream);
      }
    }, 500);
    return () => clearInterval(checkStream);
  }, []);

  return useMemo(() => ({ 
    timeLeft: Math.max(0, timeLeftFromSession || 0), 
    formatTime, webcamRef, stream 
  }), [timeLeftFromSession, formatTime, webcamRef, stream]);
};

export const useAudioLevel = (stream) => {
  const [level, setLevel] = useState(0);
  const animationFrameRef = useRef();
  const audioContextRef = useRef();

  useEffect(() => {
    if (!stream) {
      setLevel(0);
      return;
    }
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      source.connect(analyser);
      audioContextRef.current = audioContext;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (err) {
      console.error("Audio monitor error:", err);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      audioContextRef.current?.close();
    };
  }, [stream]);

  return level;
};