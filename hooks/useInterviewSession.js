import { useState, useCallback, useContext, useEffect, useRef, useMemo } from "react";
import { isString, get, isObject } from "lodash-es";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useSignalR } from "@/hooks/useSignalR";
import { useApi } from "@/hooks/useApi";
import { formatTime, delay } from "@/Utils/Func/Common";
import { useMainNotify } from "@/hooks/common";
import { APP_CONFIG } from "@/Config/appConfig";
import { getTimerStorageKey, parseQuestion, isValidSessionId, buildAnswerFormData, clearSessionTimers, getInterviewTerminatedStatus, clearInterviewTerminatedStatus, setInterviewTerminated } from "@/Utils/Func/InterviewSession";

const DEFAULT_TOTAL_QUESTIONS = APP_CONFIG.interview.defaultTotalQuestions;

const useTimerLogic = ({ isSessionStarted, currentQuestion, isSubmitting, interviewFinished, sessionId, questionIndex }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [initialTime, setInitialTime] = useState(0);
  const timeLeftRef = useRef(null);
  const initialTimeRef = useRef(0);

  useEffect(() => {
    const parsed = parseQuestion(currentQuestion);
    if (!parsed || !sessionId) { setTimeLeft(null); return; }

    const storageKey = getTimerStorageKey(sessionId, questionIndex);
    const savedEndTime = localStorage.getItem(storageKey);
    const now = Date.now();

    const applyTimer = (seconds, total) => {
      setTimeLeft(seconds);
      setInitialTime(total);
      timeLeftRef.current = seconds;
      initialTimeRef.current = total;
    };

    const parseTotal = () => {
      let total = parseInt(get(parsed, "remainingSeconds"), 10);
      if (isNaN(total)) total = (parseInt(get(parsed, "time"), 10) || 0) * 60;
      return total;
    };

    if (savedEndTime) {
      const remaining = Math.round((parseInt(savedEndTime, 10) - now) / 1000);
      if (remaining > 0) { applyTimer(remaining, parseTotal()); return; }
    }

    let seconds = parseInt(get(parsed, "remainingSeconds"), 10);
    if (isNaN(seconds)) {
      const minutes = parseInt(get(parsed, "time"), 10);
      seconds = !isNaN(minutes) ? minutes * 60 : 0;
    }

    if (seconds > 0) localStorage.setItem(storageKey, String(now + seconds * 1000));
    applyTimer(seconds, seconds);
  }, [currentQuestion, sessionId, questionIndex]);

  useEffect(() => {
    if (!isSessionStarted || timeLeft === null || timeLeft <= 0 || interviewFinished || isSubmitting) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        const next = t > 0 ? t - 1 : 0;
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSessionStarted, timeLeft, interviewFinished, isSubmitting]);

  return useMemo(() => ({
    timeLeft,
    initialTime,
    timeLeftRef,
    initialTimeRef,
  }), [timeLeft, initialTime]);
};

const useSessionState = () => {
  const [sessionId, setSessionId] = useState(null);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [finishMessage, setFinishMessage] = useState("");
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(DEFAULT_TOTAL_QUESTIONS);
  const [loadingStates, setLoadingStates] = useState({ session: true, submitting: false, finishing: false });

  const setLoading = useCallback((key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  }, []);

  return useMemo(() => ({
    sessionId, setSessionId,
    isSessionStarted, setIsSessionStarted,
    interviewFinished, setInterviewFinished,
    finishMessage, setFinishMessage,
    error, setError,
    currentQuestion, setCurrentQuestion,
    questionIndex, setQuestionIndex,
    totalQuestions, setTotalQuestions,
    loadingStates, setLoading,
  }), [
    sessionId, isSessionStarted, interviewFinished, finishMessage,
    error, currentQuestion, questionIndex, totalQuestions, loadingStates, setLoading,
  ]);
};

export const useInterviewSession = (jobId) => {
  const { userToken } = useContext(UserTokenContext);
  const { userId } = useUserAccount();
  const { success, error: notifyError } = useMainNotify();
  const submittingRef = useRef(false);
  const awaitingSignalRRef = useRef(false);
  const syncCheckedRef = useRef(false);

  const isTerminated = useMemo(() => {
    return getInterviewTerminatedStatus(jobId).isTerminated;
  }, [jobId]);

  const state = useSessionState();
  const {
    sessionId, setSessionId,
    isSessionStarted, setIsSessionStarted,
    interviewFinished, setInterviewFinished,
    finishMessage, setFinishMessage,
    error, setError,
    currentQuestion, setCurrentQuestion,
    questionIndex, setQuestionIndex,
    totalQuestions, setTotalQuestions,
    loadingStates, setLoading,
  } = state;

  useEffect(() => {
    if (isTerminated && jobId) {
      const { message } = getInterviewTerminatedStatus(jobId);
      setError(message || "Session terminated due to camera errors.");
    }
  }, [isTerminated, jobId, setError]);

  const { refetch: callStartSession }       = useApi({ type: "startSession",       autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callNextQuestion }       = useApi({ type: "nextQuestion",       autoFetch: false });
  const { refetch: callEndSession }         = useApi({ type: "endSession",         autoFetch: false });
  const { refetch: callCheckActiveSession } = useApi({ type: "checkActiveSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callGetSessionDetails }  = useApi({ type: "getSessionDetails",  autoFetch: false });

  const { isConnected, on, invoke } = useSignalR(userToken, userId);

  const parsedCurrentQuestion = useMemo(() => parseQuestion(currentQuestion), [currentQuestion]);

  const effectiveTotalQuestions = useMemo(() =>
    get(parsedCurrentQuestion, "totalquestion") || totalQuestions || DEFAULT_TOTAL_QUESTIONS
  , [parsedCurrentQuestion, totalQuestions]);

  const { timeLeft, timeLeftRef, initialTimeRef } = useTimerLogic({
    isSessionStarted,
    currentQuestion,
    isSubmitting: loadingStates.submitting,
    interviewFinished,
    sessionId,
    questionIndex,
  });

  const applyServerQuestionData = useCallback((data) => {
    const q = get(data, "question") || (get(data, "questionText") ? data : null);
    const serverIndex = get(data, "index") ?? 0;
    const serverTotal = get(data, "totalquestion") ?? get(data, "totalQuestions");

    setCurrentQuestion(q);
    setQuestionIndex(serverIndex);
    if (serverTotal) setTotalQuestions(serverTotal);
  }, [setCurrentQuestion, setQuestionIndex, setTotalQuestions]);

  const finishInterview = useCallback(async () => {
    if (!sessionId) return;
    setLoading("finishing", true);
    try {
      await callEndSession({ urlSuffix: `/${sessionId}/${jobId}` });
      setInterviewFinished(true);
      setCurrentQuestion(null);
      clearSessionTimers(sessionId);
      success("Interview Finished", "Your responses have been submitted.");
    } catch {
    } finally {
      setLoading("finishing", false);
    }
  }, [sessionId, jobId, callEndSession, success, setLoading, setInterviewFinished]);

  const autoSkipExpired = useCallback(async (sId, q, index) => {
    if (!sId || !q) return;
    const formData = buildAnswerFormData({
      sessionId: sId,
      questionId: get(q, "id") || get(q, "questionId"),
      questionIndex: index,
      timeTaken: 0,
      answerData: { text: "Time limit exceeded (Auto-recovered)" },
    });
    try { await callNextQuestion({ data: formData, silent: true }); } catch { }
  }, [callNextQuestion]);

  const syncSession = useCallback(async (silent = false) => {
    if (isTerminated) return false;
    if (!silent) setLoading("session", true);
    try {
      const res = await callCheckActiveSession();
      const sId = get(res, "data.sessionid") || get(res, "data.sessionId") || get(res, "data");
      if (!isValidSessionId(sId)) {
        syncCheckedRef.current = true;
        return false;
      }

      const detailsRes = await callGetSessionDetails({ urlSuffix: `/${sId}` });
      const data = get(detailsRes, "data");
      if (!data) {
        syncCheckedRef.current = true;
        return false;
      }

      const q = get(data, "question") || (get(data, "questionText") ? data : null);
      const remSec = parseInt(get(q, "remainingSeconds"), 10);

      if (!isNaN(remSec) && remSec <= 0) {
        await autoSkipExpired(sId, q, get(data, "index") ?? 0);
        return syncSession(silent);
      }

      setSessionId(sId);
      setIsSessionStarted(true);
      applyServerQuestionData(data);
      syncCheckedRef.current = true;
      return true;
    } catch {
      return false;
    } finally {
      if (!silent) setLoading("session", false);
    }
  }, [callCheckActiveSession, callGetSessionDetails, autoSkipExpired, applyServerQuestionData, setSessionId, setIsSessionStarted, setLoading, isTerminated]);

  const submitAnswer = useCallback(async (answerData) => {
    if (submittingRef.current || !sessionId || !parsedCurrentQuestion) return;
    submittingRef.current = true;
    setLoading("submitting", true);

    const timeTaken = initialTimeRef.current - (timeLeftRef.current || 0);
    const formData = buildAnswerFormData({
      sessionId,
      questionId: get(parsedCurrentQuestion, "id") || get(parsedCurrentQuestion, "questionId"),
      questionIndex,
      timeTaken,
      answerData,
    });

    setCurrentQuestion(null);
    awaitingSignalRRef.current = true;

    try {
      const result = await callNextQuestion({ data: formData });
      const response = get(result, "data");

      const signalRAlreadyDelivered = !awaitingSignalRRef.current;

      const isCompleted = get(response, "isCompleted") || get(response, "completed");
      const wasLastQuestion = (questionIndex + 1) >= effectiveTotalQuestions;

      if (isCompleted || wasLastQuestion) {
        awaitingSignalRRef.current = false;
        await delay(APP_CONFIG.interview.autoSubmitDelay);
        await finishInterview();
        return;
      }

      if (signalRAlreadyDelivered) return;

      const nextQ = get(response, "question") || (get(response, "questionText") ? response : null);

      if (nextQ) {
        awaitingSignalRRef.current = false;
        applyServerQuestionData(response);
      }
    } catch {
      awaitingSignalRRef.current = false;
      await syncSession(true);
    } finally {
      setLoading("submitting", false);
      submittingRef.current = false;
    }
  }, [
    sessionId, parsedCurrentQuestion, questionIndex, effectiveTotalQuestions,
    callNextQuestion, finishInterview, syncSession, applyServerQuestionData, setLoading,
  ]);

  const startInterview = useCallback(async () => {
    if (isTerminated) return;
    setError(null);
    setLoading("session", true);
    try {
      const result = await callStartSession();
      const raw = get(result, "data.sessionId") || get(result, "data.sessionid") || get(result, "data.id") || get(result, "data");
      const finalId = isObject(raw) ? (raw.sessionId || raw.id) : raw;
      if (!finalId) throw new Error("Invalid Session ID");
      setSessionId(finalId);
      setIsSessionStarted(true);
      return finalId;
    } catch {
      setError("Failed to start session");
    } finally {
      setLoading("session", false);
    }
  }, [callStartSession, setError, setLoading, setSessionId, setIsSessionStarted, isTerminated]);

  useEffect(() => {
    if (jobId) syncSession();
    else setLoading("session", false);
  }, [jobId, syncSession, setLoading]);

  useEffect(() => {
    if (!jobId) return;
    const { message } = getInterviewTerminatedStatus(jobId);
    if (message && !isTerminated) {
      notifyError("Session Terminated", message);
      clearInterviewTerminatedStatus(jobId);
    }
  }, [notifyError, isTerminated, jobId]);

  const questionIndexRef = useRef(questionIndex);
  useEffect(() => { questionIndexRef.current = questionIndex; }, [questionIndex]);

  useEffect(() => {
    const unsubNext = on("nextQuestionReady", (data) => {
      const incomingIndex = get(data, "index");
      if (incomingIndex === undefined) return;

      if (awaitingSignalRRef.current) {
        awaitingSignalRRef.current = false;
        setCurrentQuestion(data);
        setQuestionIndex(incomingIndex);
        return;
      }

      if (incomingIndex >= questionIndexRef.current) {
        setCurrentQuestion(data);
        setQuestionIndex(incomingIndex);
      }
    });
    const unsubReport = on("reportGenerationStarted", (data) => {
      setFinishMessage(get(data, "message") || "Generating your report...");
      setInterviewFinished(true);
    });
    const unsubTerminated = on("OnInterviewTerminated", (data) => {
      const msg = get(data, "message") || (isString(data) ? data : "Session terminated due to camera errors.");
      setInterviewTerminated(jobId, msg);
      window.location.reload();
    });

    return () => {
      unsubNext?.();
      unsubReport?.();
      unsubTerminated?.();
    };
  }, [on]);

  useEffect(() => {
    if (isSessionStarted && timeLeft === 0 && timeLeft !== null && parsedCurrentQuestion && !loadingStates.submitting && !interviewFinished) {
      submitAnswer({ text: "Time limit exceeded" });
    }
  }, [timeLeft, isSessionStarted, parsedCurrentQuestion, loadingStates.submitting, interviewFinished, submitAnswer]);

  return useMemo(() => ({
    isSessionStarted,
    sessionId,
    currentQuestion: parsedCurrentQuestion,
    isConnected,
    isLoading:      loadingStates.session,
    isSubmitting:   loadingStates.submitting,
    isFinishing:    loadingStates.finishing,
    startInterview,
    submitAnswer,
    finishInterview,
    syncSession,
    error,
    questionIndex,
    totalQuestions: effectiveTotalQuestions,
    interviewFinished,
    finishMessage,
    isQuestionReady: !!parsedCurrentQuestion,
    timeLeft,
    isLastQuestion: (questionIndex + 1) >= effectiveTotalQuestions,
    syncCheckedRef,
    on,
    invoke,
  }), [
    isSessionStarted, sessionId, parsedCurrentQuestion, isConnected, loadingStates,
    startInterview, submitAnswer, finishInterview, syncSession, error, questionIndex,
    effectiveTotalQuestions, interviewFinished, finishMessage, timeLeft, on, invoke
  ]);
};

export const useInterviewRoomState = (jobId) => {
  const session = useInterviewSession(jobId);
  const { currentQuestion, questionIndex, isConnected, isSessionStarted, error, isLoading, startInterview, syncCheckedRef } = session;

  useEffect(() => {
    if (isConnected && !isSessionStarted && !error && !isLoading && syncCheckedRef.current) {
      startInterview();
    }
  }, [isConnected, isSessionStarted, error, isLoading, startInterview, syncCheckedRef]);

  const questionText = useMemo(() =>
    get(currentQuestion, "questionText") || get(currentQuestion, "question") || `Preparing question ${questionIndex + 1}...`
  , [currentQuestion, questionIndex]);

  const type       = useMemo(() => get(currentQuestion, "type"),       [currentQuestion]);
  const difficulty = useMemo(() => get(currentQuestion, "difficulty"), [currentQuestion]);
  const time       = useMemo(() => get(currentQuestion, "time"),       [currentQuestion]);

  const difficultyStyles = useMemo(() => ({
    hard:   "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/30",
    medium: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/30",
    easy:   "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30",
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
  const [activeTab, setActiveTab]     = useState("text");
  const [textAnswer, setTextAnswer]   = useState("");
  const [codeAnswer, setCodeAnswer]   = useState("// Write your code here\n");
  const [language, setLanguage]       = useState("javascript");

  useEffect(() => {
    setActiveTab(questionType?.toLowerCase() === "coding" ? "code" : "text");
  }, [questionType]);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true, blobPropertyBag: { type: "audio/wav" } });

  const stripCodePlaceholder = useCallback((raw) =>
    raw.replace(/\/\/ Write your code here\n?/g, "").trim()
  , []);

  const handleSend = useCallback(() => {
    if (activeTab === "voice" && mediaBlobUrl) {
      fetch(mediaBlobUrl).then((r) => r.blob()).then((blob) => {
        onSubmit({ voiceFile: blob });
        clearBlobUrl();
      });
      return;
    }
    const raw = activeTab === "text" ? textAnswer : codeAnswer;
    onSubmit({ text: stripCodePlaceholder(raw) });
    setTextAnswer("");
    setCodeAnswer("// Write your code here\n");
  }, [activeTab, mediaBlobUrl, textAnswer, codeAnswer, onSubmit, clearBlobUrl, stripCodePlaceholder]);

  const hasAnswer = useMemo(() => {
    if (activeTab === "voice") return !!mediaBlobUrl;
    const raw = activeTab === "text" ? textAnswer : codeAnswer;
    return stripCodePlaceholder(raw).length > 0;
  }, [activeTab, textAnswer, codeAnswer, mediaBlobUrl, stripCodePlaceholder]);

  return useMemo(() => ({
    activeTab, setActiveTab,
    textAnswer, setTextAnswer,
    codeAnswer, setCodeAnswer,
    language, setLanguage,
    status, startRecording, stopRecording, mediaBlobUrl,
    handleSend, hasAnswer,
  }), [
    activeTab, textAnswer, codeAnswer, language,
    status, startRecording, stopRecording, mediaBlobUrl,
    handleSend, hasAnswer,
  ]);
};

export const useInterviewSidebar = (isSessionStarted, timeLeftFromSession) => {
  const webcamRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current?.video?.srcObject) {
        setStream(webcamRef.current.video.srcObject);
        clearInterval(interval);
      }
    }, APP_CONFIG.interview.webcamCheckInterval);
    return () => clearInterval(interval);
  }, []);

  return useMemo(() => ({
    timeLeft: Math.max(0, timeLeftFromSession || 0),
    formatTime,
    webcamRef,
    stream,
  }), [timeLeftFromSession, stream]);
};

export const useAudioLevel = (stream) => {
  const [level, setLevel] = useState(0);
  const animFrameRef   = useRef();
  const audioCtxRef    = useRef();

  useEffect(() => {
    if (!stream) { setLevel(0); return; }
    try {
      const ctx      = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      const source   = ctx.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      source.connect(analyser);
      audioCtxRef.current = ctx;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
    }
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      audioCtxRef.current?.close();
    };
  }, [stream]);

  return level;
};