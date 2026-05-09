"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApi } from "./useApi";
import { useSignalR } from "./useSignalR";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useMainNotify } from "./common";

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
      const rawBase64 = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
      const payload = { ImageBase64: rawBase64, UserId: userId };      
      const result = await callSelfieApi({ data: payload });
      const message = result?.data?.message || result?.message || "";
      const isVerified = message.toLowerCase().includes("successfully") || message.toLowerCase().includes("success");
      
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

  return { verifySelfie, isLoading: loading };
};

export const useInterviewFaceAuth = (sessionId) => {
  const { connection, isConnected, on, invoke } = useSignalR();
  const { error: notifyError } = useMainNotify();
  
  const streamingIntervalRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const [faceWarning, setFaceWarning] = useState(null);

  useEffect(() => {
    if (!isConnected) return;

    on("ErrorMessage", (message) => {
      setFaceWarning({ type: "error", message });
    });
    
    on("OnWarning", (data) => {
      const attempt = data.attempt || 0;
      setFaceWarning({ attempt, message: data.message });

      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = setTimeout(() => {
        setFaceWarning(null);
      }, 3000);
    });

    return () => {
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [isConnected, on, notifyError]);

  const streamFrame = useCallback(async (userId, frameBase64) => {
    try {
      const rawBase64 = frameBase64.includes(",") ? frameBase64.split(",")[1] : frameBase64;

      await invoke("StreamCameraFrame", userId, rawBase64, sessionId);
    } catch (err) {
      if (err !== "SignalR not connected") {
        console.error("[useInterviewFaceAuth] Failed to stream frame:", err);
      }
    }
  }, [invoke, sessionId]);

  const startStreaming = useCallback((userId, videoElement) => {
    if (streamingIntervalRef.current) return;
    if (!videoElement) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    streamingIntervalRef.current = setInterval(() => {
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        const frameBase64 = canvas.toDataURL("image/jpeg", 0.6); 
        streamFrame(userId, frameBase64);
      }
    }, 60000); 
  }, [streamFrame]);

  const stopStreaming = useCallback(() => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopStreaming();
  }, [stopStreaming]);

  return {
    startStreaming,
    stopStreaming,
    isConnected,
    isStreaming: !!streamingIntervalRef.current,
    faceWarning
  };
};
