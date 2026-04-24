"use client";

import { DarkModeProvider } from "@/Context/DarkModeContext";
import { UserTokenProvider } from "@/Context/UserTokenContext";
import { UserAccountProvider } from "@/Context/UserAccountContext";
import { ReduxProvider } from "@/Store/ReduxProvider";
import ChatbaseIdentity from "@/app/ChatbaseIdentity";

export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <UserTokenProvider>
        <UserAccountProvider>
          <DarkModeProvider>
            <ChatbaseIdentity />
            {children}
          </DarkModeProvider>
        </UserAccountProvider>
      </UserTokenProvider>
    </ReduxProvider>
  );
}
