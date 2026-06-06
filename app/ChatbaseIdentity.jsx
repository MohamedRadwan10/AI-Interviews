"use client";
import React from "react";
import Script from "next/script";
import { useChatbot } from "@/hooks/useChatbot";

const ChatbaseIdentity = () => {
  const { shouldShowChatbot } = useChatbot();

  if (!shouldShowChatbot) return null;

  return (
    <>
      <Script
        id="chatbase-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.embeddedChatbotConfig = { chatbotId: "VZ1PwRyPj3AoVjDZHRUO1", domain: "www.chatbase.co" }`
        }}
      />
      <Script
        id="chatbase-embed"
        src="https://www.chatbase.co/embed.min.js"
        strategy="lazyOnload"
        defer
      />
    </>
  );
};

export default ChatbaseIdentity;
