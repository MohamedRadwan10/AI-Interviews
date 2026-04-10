"use client";

import { DarkModeProvider } from "@/Context/DarkModeContext";
import { UserTokenProvider } from "@/Context/UserTokenContext";
import ChatbaseIdentity from "./ChatbaseIdentity";

export default function ClientLayout({ children }) {
  return (
    <UserTokenProvider>
      <DarkModeProvider>
        <ChatbaseIdentity />
        {children}
      </DarkModeProvider>
    </UserTokenProvider>
  );
}
