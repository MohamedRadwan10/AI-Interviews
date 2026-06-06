import { useEffect, useContext, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { UserTokenContext } from "@/Context/UserTokenContext";

const AUTH_PATHS = [
  "/login",
  "/account-type",
  "/candidate-onboarding",
  "/candidate-register",
  "/company-onboarding",
  "/company-register",
  "/external-login-callback",
  "/forget-password",
  "/verify-email",
  "/verify-email-request",
];

export const useChatbot = () => {
  const pathname = usePathname();
  const { userData } = useContext(UserTokenContext);

  const isAuthPage = useMemo(() => {
    if (!pathname) return false;
    return AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"));
  }, [pathname]);

  const isRoomPage = useMemo(() => {
    if (!pathname) return false;
    return pathname.includes("/interview-session/") && pathname.endsWith("/room");
  }, [pathname]);

  const shouldShowChatbot = useMemo(() => {
    return !isAuthPage && !isRoomPage;
  }, [isAuthPage, isRoomPage]);

  const identifyChatbase = useCallback(async () => {
    if (!userData || typeof window === "undefined") return;

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
  }, [userData]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (shouldShowChatbot) {
      document.documentElement.classList.remove("hide-chatbot");
    } else {
      document.documentElement.classList.add("hide-chatbot");
    }
  }, [shouldShowChatbot]);

  useEffect(() => {
    if (!userData || !shouldShowChatbot || typeof window === "undefined") return;

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
  }, [userData, shouldShowChatbot, identifyChatbase]);

  const result = useMemo(() => ({
    shouldShowChatbot,
  }), [shouldShowChatbot]);

  return result;
};
