"use client";

import { DarkModeProvider } from "@/Context/DarkModeContext";
import { UserTokenProvider } from "@/Context/UserTokenContext";

export default function ClientLayout({ children }) {
  return (
    <UserTokenProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </UserTokenProvider>
  );
}
