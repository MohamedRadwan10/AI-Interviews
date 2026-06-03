"use client";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { includes, get, toLower, isString } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { useSignalR } from "@/hooks/useSignalR";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useMainNotify } from "@/hooks/common";
import { APP_CONFIG } from "@/Config/appConfig";
import { cleanBase64, setInterviewTerminated } from "@/Utils/Func/InterviewSession";

export const useSelfie = () => {
  const { userId } = useUserAccount();
  const { error: notifyError } = useMainNotify();
  const { refetch: callSelfieApi, loading } = useApi({ type: "selfie", autoFetch: false });

  const verifySelfie = useCallback(async (imageBase64) => {
    if (!userId) {
      notifyError("Verification Error", "User identification failed. Please log in again.");
      return false;
    }

    try {
      const rawBase64 = cleanBase64(imageBase64);
      const payload = { ImageBase64: rawBase64, UserId: userId };      
      const result = await callSelfieApi({ data: payload });
      
      const message = get(result, "data.message") || get(result, "message", "");
      const isVerified = includes(toLower(message), "successfully") || includes(toLower(message), "success");
      
      if (!isVerified) {
        notifyError("Verification Failed", message || "Face not recognized. Please try again.");
      }

      return isVerified;
    } catch (err) {
      console.error("[useSelfie] Verification error details:", err);
      notifyError("Selfie Verification Failed", "Network error or invalid response. Please try again.");
      return false;
    }
  }, [userId, callSelfieApi, notifyError]);

  return useMemo(() => ({ 
    verifySelfie, 
    isLoading: loading 
  }), [verifySelfie, loading]);
};

export const useInterviewFaceAuth = (sessionId, on, invoke, isConnected, jobId) => {
  const { error: notifyError } = useMainNotify();
  
  const streamingIntervalRef = useRef(null);
  const pendingClearTimeoutRef = useRef(null);
  const userIdRef = useRef(null);
  const videoElementRef = useRef(null);
  const warningReceivedForLastFrameRef = useRef(false);

  const [faceWarning, setFaceWarning] = useState(null);
  const [isStreamingActive, setIsStreamingActive] = useState(false);

  const streamFrame = useCallback(async (userId, frameBase64) => {
    try {
      const rawBase64 = cleanBase64(frameBase64);
      await invoke("StreamCameraFrame", userId, rawBase64, sessionId);
    } catch (err) {
      if (err !== "SignalR not connected") {
        console.error("[useInterviewFaceAuth] Failed to stream frame:", err);
      }
    }
  }, [invoke, sessionId]);

  const sendFrame = useCallback(() => {
    const videoElement = videoElementRef.current;
    const userId = userIdRef.current;
    if (!videoElement || !userId) return;

    if (videoElement.readyState >= 2) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      const frameBase64 = canvas.toDataURL("image/jpeg", APP_CONFIG.faceAuth.frameQuality); 
      
      warningReceivedForLastFrameRef.current = false;
      
      streamFrame(userId, frameBase64);

      if (pendingClearTimeoutRef.current) clearTimeout(pendingClearTimeoutRef.current);
      pendingClearTimeoutRef.current = setTimeout(() => {
        if (!warningReceivedForLastFrameRef.current) {
          setFaceWarning(null);
        }
      }, APP_CONFIG.faceAuth.warningDisplayTime); 
    } else {
      setTimeout(sendFrame, APP_CONFIG.faceAuth.retryInterval);
    }
  }, [streamFrame]);

  useEffect(() => {
    if (!isStreamingActive || !userIdRef.current || !videoElementRef.current) return;

    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }

    const intervalTime = faceWarning ? APP_CONFIG.faceAuth.frameError : APP_CONFIG.faceAuth.frameInterval;

    streamingIntervalRef.current = setInterval(() => {
      sendFrame();
    }, intervalTime);

    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, [faceWarning, sendFrame, isStreamingActive]);

  const startStreaming = useCallback((userId, videoElement) => {
    if (userIdRef.current && videoElementRef.current) return;
    userIdRef.current = userId;
    videoElementRef.current = videoElement;
    setIsStreamingActive(true);
    
    sendFrame();
  }, [sendFrame]);

  const stopStreaming = useCallback(() => {
    userIdRef.current = null;
    videoElementRef.current = null;
    setIsStreamingActive(false);
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    if (pendingClearTimeoutRef.current) {
      clearTimeout(pendingClearTimeoutRef.current);
      pendingClearTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    const unsubError = on("ErrorMessage", (message) => {
      warningReceivedForLastFrameRef.current = true;
      if (pendingClearTimeoutRef.current) {
        clearTimeout(pendingClearTimeoutRef.current);
        pendingClearTimeoutRef.current = null;
      }
      setFaceWarning({ type: "error", message });
    });
    
    const unsubWarning = on("OnWarning", (data) => {
      warningReceivedForLastFrameRef.current = true;
      if (pendingClearTimeoutRef.current) {
        clearTimeout(pendingClearTimeoutRef.current);
        pendingClearTimeoutRef.current = null;
      }
      const attempt = get(data, "attempt", 0);
      setFaceWarning({ attempt, message: get(data, "message") });
    });

    const unsubSuccess = on("OnSuccess", (data) => {
      setFaceWarning(null);
      if (pendingClearTimeoutRef.current) {
        clearTimeout(pendingClearTimeoutRef.current);
        pendingClearTimeoutRef.current = null;
      }
    });

    const unsubTerminated = on("OnInterviewTerminated", (data) => {
      const msg = get(data, "message") || (isString(data) ? data : "Session terminated due to camera errors.");
      setInterviewTerminated(jobId, msg);
      window.location.reload();
    });

    return () => {
      unsubError?.();
      unsubWarning?.();
      unsubSuccess?.();
      unsubTerminated?.();
      if (pendingClearTimeoutRef.current) clearTimeout(pendingClearTimeoutRef.current);
    };
  }, [isConnected, on, jobId]);

  useEffect(() => {
    return () => stopStreaming();
  }, [stopStreaming]);

  return useMemo(() => ({
    startStreaming,
    stopStreaming,
    isConnected,
    isStreaming: !!streamingIntervalRef.current,
    faceWarning
  }), [startStreaming, stopStreaming, isConnected, faceWarning]);
};
