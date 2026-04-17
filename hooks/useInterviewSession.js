"use client";
import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useSignalR } from "./useSignalR";
import { useApi } from "./useApi";
import { get } from "lodash-es";
import { useReactMediaRecorder } from "react-media-recorder-2";

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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5); // Default to 5

  const { isConnected, on } = useSignalR(userToken, userId);

  const { refetch: callStartSession } = useApi({
    type: "startSession",
    autoFetch: false,
    urlSuffix: `/${jobId}`,
  });

  const { refetch: callNextQuestion } = useApi({
    type: "nextQuestion",
    autoFetch: false,
  });

  const { refetch: callEndSession } = useApi({
    type: "endSession",
    autoFetch: false,
    urlSuffix: `/${sessionId}/${jobId}`,
  });

  useEffect(() => {
    on("nextQuestionReady", setCurrentQuestion);
    on("reportGenerationStarted", () => setInterviewFinished(true));
  }, [on]);

  const startInterview = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (sessionId) {
        setIsSessionStarted(true);
        return sessionId;
      }

      const result = await callStartSession();
      const data = get(result, 'data');
      
      const sId = typeof data === "string" ? data : get(data, 'SessionId') || get(data, 'sessionId') || get(data, 'id') || "";

      if (!sId) throw new Error("No SessionId returned from server.");

      setSessionId(sId);
      setIsSessionStarted(true);
      return sId;
    } catch (err) {
      const rawError = get(err, 'error') || get(err, 'response.data') || err;
      const errorMsg = typeof rawError === "string" ? rawError : get(rawError, 'message') || get(rawError, 'title') || "Failed to start interview session.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [jobId, callStartSession, sessionId]);

  const finishInterview = useCallback(async () => {
    if (!sessionId) return;
    setIsFinishing(true);
    try {
      const result = await callEndSession();

      setInterviewFinished(true); 
      setSessionId(null);
      setCurrentQuestion(null);
      setQuestionIndex(0);
    } catch (err) {
      // EndSession silent fail
    } finally {
      setIsFinishing(false);
    }
  }, [sessionId, jobId, callEndSession]);

  const submitAnswer = useCallback(async (answerData) => {
    if (!sessionId || !currentQuestion) return;

    setIsSubmitting(true);
    
    let parsedQuestion = currentQuestion;
    if (typeof currentQuestion === "string") {
      try { parsedQuestion = JSON.parse(currentQuestion); } catch (e) {}
    }

    const qId = get(parsedQuestion, 'order') || get(parsedQuestion, 'Order') || get(parsedQuestion, 'id') || get(parsedQuestion, 'Id') || get(parsedQuestion, 'questionId') || "";
    
    const formData = new FormData();
    formData.append("SessionId", sessionId);
    formData.append("Order", qId);
    formData.append("currentQuestionIndex", questionIndex);
    formData.append("UserAnswer", answerData.text || "");
    
    if (answerData.voiceFile) {
        formData.append("voiceFile", answerData.voiceFile);
    } else {
        formData.append("voiceFile", new Blob([], { type: "application/octet-stream" }), "empty.bin");
    }

    try {
      const response = await callNextQuestion({ data: formData });
      
      if (questionIndex >= 4) {
        await finishInterview();
      } else {
        setQuestionIndex(prev => prev + 1);
      }
    } catch (err) {
      // Submit answer silent fail
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, currentQuestion, questionIndex, finishInterview, callNextQuestion]);

  const resetSession = useCallback(() => {
    setSessionId(null);
    setQuestionIndex(0);
    window.location.reload();
  }, []);

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
    isLastQuestion: questionIndex >= 4,
    interviewFinished,
    resetSession,
  };
};

export const useAnswerConsole = (onSubmit) => {
  const [activeTab, setActiveTab] = useState("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [codeAnswer, setCodeAnswer] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = 
    useReactMediaRecorder({ audio: true, blobPropertyBag: { type: "audio/wav" } });

  const handleSend = () => {
    const data = {};
    if (activeTab === "text") data.text = textAnswer;
    if (activeTab === "code") data.text = codeAnswer;
    
    if (activeTab === "voice" && mediaBlobUrl) {
        fetch(mediaBlobUrl)
          .then(res => res.blob())
          .then(blob => {
            onSubmit({ voiceFile: blob });
            clearBlobUrl();
          });
        return;
    }
    
    onSubmit(data);
    setTextAnswer("");
    setCodeAnswer("// Write your code here\n");
  };

  const hasAnswer = 
    (activeTab === "text" && textAnswer.trim().length > 0) ||
    (activeTab === "code" && codeAnswer.trim().length > 0 && codeAnswer !== "// Write your code here\n") ||
    (activeTab === "voice" && !!mediaBlobUrl);

  return {
    activeTab, setActiveTab,
    textAnswer, setTextAnswer,
    codeAnswer, setCodeAnswer,
    language, setLanguage,
    status, startRecording, stopRecording, mediaBlobUrl,
    handleSend,
    hasAnswer
  };
};

export const useInterviewSidebar = (isSessionStarted) => {
  const [timeLeft, setTimeLeft] = useState(1200);
  const webcamRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (isSessionStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        setLevel(Math.min(100, Math.round(((sum / dataArray.length) / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (err) {
      // Audio level monitor error
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream]);

  return level;
};
