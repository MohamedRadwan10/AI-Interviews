"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { XCircle } from "lucide-react";

const VerifyEmailError = ({ error }) => {
  return (
    <>
      <div className="flex justify-center mb-8">
        <XCircle className="w-16 h-16 text-status-error" />
      </div>
      <MainText
        tag="h1"
        title="Verification Failed"
        className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-4 tracking-tight"
      />
      <MainText
        tag="p"
        title={error || "The verification link is invalid or has expired."}
        className="text-status-error text-base leading-relaxed"
      />
    </>
  );
};

export default VerifyEmailError;
