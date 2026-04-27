"use client";
import { useState, useCallback, useContext, useEffect, useRef, useMemo } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useSignalR } from "@/hooks/useSignalR";
import { useApi } from "@/hooks/useApi";
import { get, uniqBy } from "lodash-es";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { formatTime, delay } from "@/Utils/Func/Common";
const INVALID_SESSION_ID = "00000000-0000-0000-0000-000000000000";

export const useInterviewSession = (jobId) => {
  const { userToken } = useContext(UserTokenContext);
  const { userId } = useUserAccount();

  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState(null);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [finishMessage, setFinishMessage] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState();

  const { isConnected, on } = useSignalR(userToken, userId);

  const { refetch: callStartSession } = useApi({ type: "startSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callNextQuestion } = useApi({ type: "nextQuestion", autoFetch: false });
  const { refetch: callEndSession } = useApi({ type: "endSession", autoFetch: false, urlSuffix: `/${sessionId}/${jobId}` });
  const { refetch: callCheckActiveSession } = useApi({ type: "checkActiveSession", autoFetch: false, urlSuffix: `/${jobId}` });
  const { refetch: callGetSessionDetails } = useApi({ type: "getSessionDetails", autoFetch: false });

  const restoreSession = useCallback(async (sId) => {
    setIsLoading(true);
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
      console.error("❌ Session Restoration Failed (Backend Error):", err);
      setSessionId(null);
      setIsSessionStarted(false);
    } finally {
      setIsLoading(false);
    }
  }, [callGetSessionDetails]);

  useEffect(() => {
    const initSession = async () => {
      if (!jobId) return;
      try {
        const response = await callCheckActiveSession();
        const data = get(response, "data");
        const activeSId = get(data, "sessionid") || get(data, "sessionId") || (get(data, "hasActiveSession") ? get(data, "sessionid") : null);

        if (activeSId && activeSId !== INVALID_SESSION_ID && typeof activeSId === "string") {
          await restoreSession(activeSId);
        }
      } catch (err) {
        console.error("Check active session error:", err);
      }
    };
    initSession();
  }, [jobId, restoreSession, callCheckActiveSession]);

  useEffect(() => {
    on("nextQuestionReady", setCurrentQuestion);
    on("reportGenerationStarted", (data) => {
      setFinishMessage(get(data, "message") || "Interview ended. Your report is being generated now.");
      setInterviewFinished(true);
    });
  }, [on]);

  const startInterview = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await callStartSession();
      const data = get(result, "data");
      const sId = typeof data === "string" ? data : get(data, "sessionid") || get(data, "SessionId") || get(data, "sessionId") || get(data, "id") || "";

      if (!sId) throw new Error("No SessionId returned from server.");

      setSessionId(sId);
      setIsSessionStarted(true);
      return sId;
    } catch (err) {
      const rawError = get(err, "error") || get(err, "response.data") || err;
      setError(typeof rawError === "string" ? rawError : get(rawError, "message") || get(rawError, "title") || "Failed to start interview session.");
    } finally {
      setIsLoading(false);
    }
  }, [callStartSession]);

  const finishInterview = useCallback(async () => {
    if (!sessionId) return;
    setIsFinishing(true);
    try {
      await callEndSession();
      setInterviewFinished(true);
      setCurrentQuestion(null);
      setQuestionIndex(0);
    } catch (err) {
      console.error("Finish interview error:", err);
    } finally {
      setIsFinishing(false);
    }
  }, [sessionId, callEndSession]);

  const submitAnswer = useCallback(async (answerData) => {
    if (!sessionId || !currentQuestion) return;
    setIsSubmitting(true);

    let parsedQuestion = currentQuestion;
    if (typeof currentQuestion === "string") {
      try { parsedQuestion = JSON.parse(currentQuestion); } catch (e) {}
    }

    const qId = get(parsedQuestion, "id") || get(parsedQuestion, "questionId") || "";
    const formData = new FormData();
    
    formData.append("SessionId", sessionId);
    formData.append("QuestionId", qId);
    formData.append("index", questionIndex);
    formData.append("currentQuestionIndex", questionIndex);

    if (answerData.voiceFile) {
      formData.append("voiceFile", answerData.voiceFile, "voice.wav");
      formData.append("UserAnswer", "");
      console.log("[submitAnswer] Sending VOICE answer");
    } else {
      const textToSubmit = answerData.text || "";
      formData.append("UserAnswer", textToSubmit);
      console.log("[submitAnswer] Sending TEXT answer:", textToSubmit);
    }

    const questionOrder = questionIndex + 1;
    const effectiveTotal = get(parsedQuestion, "totalquestion", totalQuestions);

    try {
      const result = await callNextQuestion({ data: formData });
      const responseData = get(result, "data");

      const isCompleted = get(responseData, "isCompleted") || get(responseData, "isFinished") || get(responseData, "isLast") || get(responseData, "completed") === true;
      console.log("[submitAnswer] responseData:", responseData, "| isCompleted:", isCompleted, "| questionOrder:", questionOrder, "| effectiveTotal:", effectiveTotal);

      if (isCompleted || (effectiveTotal && questionOrder >= effectiveTotal)) {
        await delay(1500);
        await finishInterview();
      } else {
        setQuestionIndex((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Submit answer failed:", get(err, "error.response.data") || get(err, "error") || err);
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, currentQuestion, questionIndex, totalQuestions, finishInterview, callNextQuestion]);

  return useMemo(() => {
    let parsedQuestion = currentQuestion;
    if (typeof currentQuestion === "string") {
      try { parsedQuestion = JSON.parse(currentQuestion); } catch (e) {}
    }
    const questionOrder = questionIndex + 1;
    const effectiveTotal = get(parsedQuestion, "totalquestion", totalQuestions);

    return {
      isSessionStarted,
      sessionId,
      currentQuestion,
      isConnected,
      isLoading,
      isSubmitting,
      startInterview,
      submitAnswer,
      finishInterview,
      isFinishing,
      error,
      questionIndex,
      isLastQuestion: effectiveTotal ? questionOrder >= effectiveTotal : false,
      totalQuestions: effectiveTotal,
      interviewFinished,
      finishMessage,
    };
  }, [
    isSessionStarted, sessionId, currentQuestion, isConnected, isLoading, 
    isSubmitting, startInterview, submitAnswer, finishInterview, isFinishing, 
    error, questionIndex, totalQuestions, interviewFinished, finishMessage
  ]);
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

export const useInterviewSidebar = (isSessionStarted, questionTime) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const webcamRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (questionTime) {
      const parsedTime = parseInt(questionTime, 10);
      setTimeLeft(!isNaN(parsedTime) ? parsedTime * 60 : 0);
    } else {
      setTimeLeft(0);
    }
  }, [questionTime]);

  useEffect(() => {
    if (isSessionStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isSessionStarted, timeLeft]);

  useEffect(() => {
    const checkStream = setInterval(() => {
      if (webcamRef.current?.video?.srcObject) {
        setStream(webcamRef.current.video.srcObject);
        clearInterval(checkStream);
      }
    }, 500);
    return () => clearInterval(checkStream);
  }, []);

  return { timeLeft, formatTime, webcamRef, stream };
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
