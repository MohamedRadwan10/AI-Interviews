"use client";

import { DarkModeProvider } from "@/Context/DarkModeContext";
import { UserTokenProvider } from "@/Context/UserTokenContext";
import { UserAccountProvider } from "@/Context/UserAccountContext";
import { ReduxProvider } from "@/Store/ReduxProvider";
import ChatbaseIdentity from "@/app/ChatbaseIdentity";
import { ToastProvider } from "@/Context/ToastContext";
import { ConfirmationProvider } from "@/Context/ConfirmationContext";

export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <UserTokenProvider>
        <UserAccountProvider>
          <DarkModeProvider>
            <ToastProvider>
              <ConfirmationProvider>
                <ChatbaseIdentity />
                {children}
              </ConfirmationProvider>
            </ToastProvider>
          </DarkModeProvider>
        </UserAccountProvider>
      </UserTokenProvider>
    </ReduxProvider>
  );
}
