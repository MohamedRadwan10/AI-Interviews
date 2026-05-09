"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (token, userId) => {
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const callbacksRef = useRef({});

  const on = useCallback((eventName, callback) => {
    callbacksRef.current[eventName] = callback;
  }, []);

  useEffect(() => {
    const tokenToUse = token || (typeof window !== "undefined" ? localStorage.getItem("userToken") : null);
    if (!tokenToUse) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://intellhire.runasp.net/quizHub", {
        accessTokenFactory: () => tokenToUse,
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [token]);

  useEffect(() => {
    if (!connection) return;

    let isMounted = true;

    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          if (isMounted) {
            setIsConnected(true);
            console.log("✅ Connected to SignalR Hub Successfully!");
          }
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          console.error("❌ SignalR Connection Error: ", err);
        }
      }
    };

    startConnection();

    connection.on("updateStatus", (message) => {
      callbacksRef.current["updateStatus"]?.(message);
    });

    connection.on("nextQuestionReady", (question) => {
      callbacksRef.current["nextQuestionReady"]?.(question);
    });

    connection.on("reportGenerationStarted", (data) => {
      callbacksRef.current["reportGenerationStarted"]?.(data);
    });

    connection.on("reportReady", (message) => {
      callbacksRef.current["reportReady"]?.(message);
    });

    connection.on("ErrorMessage", (message) => {
      callbacksRef.current["ErrorMessage"]?.(message);
    });

    connection.on("OnWarning", (data) => {
      callbacksRef.current["OnWarning"]?.(data);
    });

    connection.on("OnInterviewTerminated", (data) => {
      callbacksRef.current["OnInterviewTerminated"]?.(data);
    });

    return () => {
      isMounted = false;
      connection.off("updateStatus");
      connection.off("nextQuestionReady");
      connection.off("reportGenerationStarted");
      connection.off("reportReady");
      connection.off("ErrorMessage");
      connection.off("OnWarning");
      connection.off("OnInterviewTerminated");
    };
  }, [connection]);

  const invoke = useCallback(
    async (methodName, ...args) => {
      if (connection && (connection.state === signalR.HubConnectionState.Connected || isConnected)) {
        return await connection.invoke(methodName, ...args);
      }
      return Promise.reject("SignalR not connected");
    },
    [connection, isConnected]
  );

  return {
    isConnected,
    on,
    invoke,
    connection,
  };
};
