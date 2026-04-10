"use client";
import { useEffect, useContext } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";

export default function ChatbaseIdentity() {
  const { userData } = useContext(UserTokenContext);

  useEffect(() => {
    if (userData && window.chatbase) {
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
            if (data.token) {
              window.chatbase('identify', { token: data.token });
              console.log("Chatbase identified user successfully.");
            }
          }
        } catch (error) {
          console.error("Failed to authenticate with Chatbase", error);
        }
      };

      identifyChatbase();
    }
  }, [userData]);

  return null;
}
