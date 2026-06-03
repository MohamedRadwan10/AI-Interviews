"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (token, userId) => {
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const callbacksRef = useRef({});

  const on = useCallback((eventName, callback) => {
    if (!callbacksRef.current[eventName]) {
      callbacksRef.current[eventName] = [];
    }
    callbacksRef.current[eventName].push(callback);
    return () => {
      if (callbacksRef.current[eventName]) {
        callbacksRef.current[eventName] = callbacksRef.current[eventName].filter((cb) => cb !== callback);
      }
    };
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

    const trigger = (eventName, data) => {
      const listeners = callbacksRef.current[eventName];
      if (Array.isArray(listeners)) {
        listeners.forEach((cb) => {
          try {
            cb(data);
          } catch (err) {
            console.error(`Error in SignalR callback for event ${eventName}:`, err);
          }
        });
      }
    };

    connection.on("updateStatus", (message) => {
      trigger("updateStatus", message);
    });

    connection.on("nextQuestionReady", (question) => {
      trigger("nextQuestionReady", question);
    });

    connection.on("reportGenerationStarted", (data) => {
      trigger("reportGenerationStarted", data);
    });

    connection.on("reportReady", (message) => {
      trigger("reportReady", message);
    });

    connection.on("ErrorMessage", (message) => {
      trigger("ErrorMessage", message);
    });

    connection.on("OnWarning", (data) => {
      trigger("OnWarning", data);
    });

    connection.on("OnSuccess", (data) => {
      trigger("OnSuccess", data);
    });

    connection.on("OnInterviewTerminated", (data) => {
      trigger("OnInterviewTerminated", data);
    });

    connection.on("ReceiveCompanyNotification", (data) => {
      trigger("ReceiveCompanyNotification", data);
    });
    
    connection.on("ReceiveUserNotification", (data) => {
      trigger("ReceiveUserNotification", data);
    });

    return () => {
      isMounted = false;
      connection.off("updateStatus");
      connection.off("nextQuestionReady");
      connection.off("reportGenerationStarted");
      connection.off("reportReady");
      connection.off("ErrorMessage");
      connection.off("OnWarning");
      connection.off("OnSuccess");
      connection.off("OnInterviewTerminated");
      connection.off("ReceiveCompanyNotification");
      connection.off("ReceiveUserNotification");
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
