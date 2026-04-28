"use client";
import { useState, useCallback, useContext, useEffect, useRef, useMemo } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useSignalR } from "@/hooks/useSignalR";
import { useApi } from "@/hooks/useApi";
import { get, uniqBy } from "lodash-es";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { formatTime, delay } from "@/Utils/Func/Common";
import { useNavigation, useMainNotify } from "@/hooks/common";

const INVALID_SESSION_ID = "00000000-0000-0000-0000-000000000000";

export const useInterviewSession = (jobId) => {
  const { userToken } = useContext(UserTokenContext);
  const { userId } = useUserAccount();
  const { success } = useMainNotify();

  const [sessionId, setSessionId] = useState(null);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [finishMessage, setFinishMessage] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [timeLeft, setTimeLeft] = useState(null);
  const [initialTime, setInitialTime] = useState(0);

  const [loadingStates, setLoadingStates] = useState({
    session: true,
    submitting: false,
    finishing: false,
  });
  const [error, setError] = useState(null);

  const { isConnected, on } = useSignalR(userToken, userId);

  const { refetch: callStartSession } = useApi({ type: "startSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callNextQuestion } = useApi({ type: "nextQuestion", autoFetch: false });
  const { refetch: callEndSession } = useApi({ type: "endSession", autoFetch: false });
  const { refetch: callCheckActiveSession } = useApi({ type: "checkActiveSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callGetSessionDetails } = useApi({ type: "getSessionDetails", autoFetch: false });

  const parseQuestion = (q) => {
    if (!q) return null;
    try {
      return typeof q === "string" ? JSON.parse(q) : q;
    } catch (e) {
      return q;
    }
  };

  const restoreSession = useCallback(async (sId) => {
    setLoadingStates(prev => ({ ...prev, session: true }));
    try {
      const result = await callGetSessionDetails({ urlSuffix: `/${sId}` });
      const data = get(result, "data");
      if (data) {
        setSessionId(sId);
        setIsSessionStarted(true);
        setCurrentQuestion(get(data, "question") || (get(data, "questionText") ? data : null));
        setQuestionIndex(get(data, "index") ?? 0);
        setTotalQuestions(get(data, "totalquestion") ?? 15);
      }
    } catch (err) {
      setIsSessionStarted(false);
    } finally {
      setLoadingStates(prev => ({ ...prev, session: false }));
    }
  }, [callGetSessionDetails]);

  const finishInterview = useCallback(async () => {
    if (!sessionId) return;
    setLoadingStates(prev => ({ ...prev, finishing: true }));
    try {
      await callEndSession({ urlSuffix: `/${sessionId}/${jobId}` });
      setInterviewFinished(true);
      success("Interview Finished", "Your responses have been submitted.");
      setCurrentQuestion(null);
      setTimeLeft(null);
    } catch (err) {
      console.error("Finish error:", err);
    } finally {
      setLoadingStates(prev => ({ ...prev, finishing: false }));
    }
  }, [sessionId, jobId, callEndSession, success]);
  
  // 1. Initial Check
  useEffect(() => {
    if (!jobId) {
       setLoadingStates(prev => ({ ...prev, session: false }));
       return;
    }
    const init = async () => {
      setLoadingStates(prev => ({ ...prev, session: true }));
      try {
        const res = await callCheckActiveSession();
        const activeSId = get(res, "data.sessionid") || get(res, "data.sessionId") || get(res, "data");
        if (activeSId && activeSId !== INVALID_SESSION_ID && typeof activeSId === "string") {
          await restoreSession(activeSId);
        } else {
          setLoadingStates(prev => ({ ...prev, session: false }));
        }
      } catch (err) {
        setLoadingStates(prev => ({ ...prev, session: false }));
      }
    };
    init();
  }, [jobId, restoreSession, callCheckActiveSession]);

  useEffect(() => {
    on("nextQuestionReady", data => setCurrentQuestion(data));
    on("reportGenerationStarted", data => {
      setFinishMessage(get(data, "message") || "Generating your report...");
      setInterviewFinished(true);
    });
  }, [on]);

  // 3. Question Timer Initializer
  useEffect(() => {
    const parsed = parseQuestion(currentQuestion);
    if (!parsed) return;

    let totalSeconds = parseInt(get(parsed, "remainingSeconds"), 10);

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      const minutes = parseInt(get(parsed, "time"), 10);
      if (!isNaN(minutes) && minutes > 0) {
        totalSeconds = minutes * 60;
      }
    }

    if (!isNaN(totalSeconds) && totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setInitialTime(totalSeconds);
    }
  }, [currentQuestion]);

  // 4. Global Ticker (Timer)
  useEffect(() => {
    if (isSessionStarted && timeLeft > 0 && !interviewFinished && !loadingStates.submitting) {
      const timer = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [isSessionStarted, timeLeft, interviewFinished, loadingStates.submitting]);

  const startInterview = useCallback(async () => {
    setError(null);
    setLoadingStates(prev => ({ ...prev, session: true }));
    try {
      const result = await callStartSession();
      const sId = get(result, "data.sessionid") || get(result, "data.id") || result.data;
      if (!sId) throw new Error("Session ID missing");
      setSessionId(sId);
      setIsSessionStarted(true);
      return sId;
    } catch (err) {
      setError("Failed to start session");
    } finally {
      setLoadingStates(prev => ({ ...prev, session: false }));
    }
  }, [callStartSession]);

  const submitAnswer = useCallback(async (answerData) => {
    if (!sessionId || !currentQuestion) return;
    
    // Snapshot time and question before clearing
    const timeTaken = initialTime - (timeLeft || 0);
    const parsed = parseQuestion(currentQuestion);
    const qId = get(parsed, "id") || get(parsed, "questionId");
    
    setLoadingStates(prev => ({ ...prev, submitting: true }));
    setCurrentQuestion(null);
    setTimeLeft(null);

    const formData = new FormData();
    formData.append("SessionId", sessionId);
    formData.append("QuestionId", qId);
    formData.append("currentQuestionIndex", questionIndex);
    formData.append("time", String(timeTaken));
    
    if (answerData?.voiceFile) formData.append("voiceFile", answerData.voiceFile, "voice.wav");
    else formData.append("UserAnswer", answerData?.text || "");

    try {
      const result = await callNextQuestion({ data: formData });
      const response = get(result, "data");
      const nextQ = get(response, "question") || (get(response, "questionText") ? response : null);
      
      if (nextQ?.id) setCurrentQuestion(nextQ);

      const isCompleted = get(response, "isCompleted") || get(response, "completed");
      const effectiveTotal = get(parsed, "totalquestion") || totalQuestions;
      const isLast = (questionIndex + 1) >= effectiveTotal;

      if (isCompleted || isLast) {
        await delay(1000);
        await finishInterview();
      } else {
        setQuestionIndex(prev => prev + 1);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoadingStates(prev => ({ ...prev, submitting: false }));
    }
  }, [sessionId, currentQuestion, questionIndex, totalQuestions, initialTime, timeLeft, callNextQuestion, finishInterview]);

  // Auto-submit when time is up
  useEffect(() => {
    if (isSessionStarted && timeLeft === 0 && currentQuestion && !loadingStates.submitting && !interviewFinished) {
      submitAnswer({ text: "Time limit exceeded" });
    }
  }, [timeLeft, isSessionStarted, currentQuestion, loadingStates.submitting, interviewFinished, submitAnswer]);

  const parsedCurrentQuestion = useMemo(() => parseQuestion(currentQuestion), [currentQuestion]);
  const effectiveTotalQuestions = useMemo(() => {
    return get(parsedCurrentQuestion, "totalquestion") || totalQuestions || 15;
  }, [parsedCurrentQuestion, totalQuestions]);

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
    questionIndex:questionIndex,
    totalQuestions: effectiveTotalQuestions,
    interviewFinished,
    finishMessage,
    isQuestionReady: !!parsedCurrentQuestion,
    timeLeft,
    isLastQuestion: (questionIndex + 1) >= effectiveTotalQuestions
  }), [isSessionStarted, sessionId, parsedCurrentQuestion, isConnected, loadingStates, startInterview, submitAnswer, finishInterview, error, questionIndex, effectiveTotalQuestions, interviewFinished, finishMessage, timeLeft]);
};

export const useAnswerConsole = (onSubmit) => {
  const [activeTab, setActiveTab] = useState("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [codeAnswer, setCodeAnswer] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true, blobPropertyBag: { type: "audio/wav" } });

  const handleSend = () => {
    if (activeTab === "voice" && mediaBlobUrl) {
      fetch(mediaBlobUrl).then((res) => res.blob()).then((blob) => {
        onSubmit({ voiceFile: blob });
        clearBlobUrl();
      });
      return;
    }
    onSubmit({ text: activeTab === "text" ? textAnswer : codeAnswer });
    setTextAnswer("");
    setCodeAnswer("// Write your code here\n");
  };

  const hasAnswer = 
    (activeTab === "text" && textAnswer.trim().length > 0) ||
    (activeTab === "code" && codeAnswer.trim().length > 0 && codeAnswer !== "// Write your code here\n") ||
    (activeTab === "voice" && !!mediaBlobUrl);

  return {
    activeTab, setActiveTab, textAnswer, setTextAnswer, codeAnswer, setCodeAnswer,
    language, setLanguage, status, startRecording, stopRecording, mediaBlobUrl, handleSend, hasAnswer
  };
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

  return { timeLeft: timeLeftFromSession === -1 ? 0 : (timeLeftFromSession || 0), formatTime, webcamRef, stream };
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
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        setLevel(Math.min(100, Math.round((sum / dataArray.length / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (err) {
      console.error("Audio level monitor error:", err);
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream]);

  return level;
};
