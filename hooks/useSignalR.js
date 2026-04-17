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

    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          setIsConnected(true);
          console.log("✅ Connected to SignalR Hub Successfully!");
        }
      } catch (err) {
        console.error("❌ SignalR Connection Error: ", err);
      }
    };

    startConnection();

    connection.on("updateStatus", (message) => {
      console.log("🔔 SignalR updateStatus:", message);
      if (callbacksRef.current["updateStatus"]) {
        callbacksRef.current["updateStatus"](message);
      }
    });

    connection.on("nextQuestionReady", (question) => {
      console.log("✅ SignalR nextQuestionReady:", question);
      if (callbacksRef.current["nextQuestionReady"]) {
        callbacksRef.current["nextQuestionReady"](question);
      }
    });

    connection.on("reportGenerationStarted", (session, message) => {
      console.log("✅ SignalR reportGenerationStarted:", session, message);
      if (callbacksRef.current["reportGenerationStarted"]) {
        callbacksRef.current["reportGenerationStarted"](session, message);
      }
    });

    connection.on("reportReady", (message) => {
      console.log("✅ SignalR reportReady:", message);
      if (callbacksRef.current["reportReady"]) {
        callbacksRef.current["reportReady"](message);
      }
    });

    return () => {
      connection.off("updateStatus");
      connection.off("nextQuestionReady");
      connection.off("reportGenerationStarted");
      connection.off("reportReady");
    };
  }, [connection]);

  return {
    isConnected,
    on,
    connection,
  };
};
