import LoginPage from "@/Components/auth/Login";
import React from "react";

export const metadata = {
  title: "Login | IntelliHire",
  description: "Log in to your IntelliHire account to access your dashboard.",
};

const Page = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Page;
