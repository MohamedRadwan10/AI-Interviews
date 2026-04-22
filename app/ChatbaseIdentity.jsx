"use client";
import { useEffect, useContext } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";

export default function ChatbaseIdentity() {
  const { userData } = useContext(UserTokenContext);

  useEffect(() => {
    if (userData && typeof window !== "undefined") {
      const identifyChatbase = async () => {
        try {
          const response = await fetch("/api/chatbase-auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userData }),
          });

          if (response.ok) {
            const data = await response.json();
            
            const chatbase = window.chatbase || (window.chatbase = function() {
              (window.chatbase.q = window.chatbase.q || []).push(arguments);
            });

            if (data.userHash) {
              chatbase('identify', {
                customerIdentity: data.customerIdentity,
                userHash: data.userHash,
              });
              console.log("Chatbase identified user securely.");
            } else if (data.customerIdentity) {
              chatbase('identify', {
                customerIdentity: data.customerIdentity,
              });
              console.log("Chatbase identified user by identity only.");
            }
          }
        } catch (error) {
          console.error("Failed to authenticate with Chatbase", error);
        }
      };

      if (window.chatbase) {
        identifyChatbase();
      } else {
        const interval = setInterval(() => {
          if (window.chatbase) {
            identifyChatbase();
            clearInterval(interval);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [userData]);

  return null;
}
