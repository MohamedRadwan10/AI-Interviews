"use client";
import React, { Suspense } from "react";
import { useVerifyEmail } from "@/hooks/useAuth";
import MainText from "@/Components/Common/MainText";
import { CheckCircle2, XCircle } from "lucide-react";
import { VerifyEmailError } from "@/Components/Errors";

const VerifyEmailContent = () => {
  const { status, error } = useVerifyEmail();

  const renderContent = () => {
    if (status === "success") {
      return (
        <>
          <div className="flex justify-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-status-success animate-bounce" />
          </div>
          <MainText
            tag="h1"
            title="Email Verified!"
            className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-4 tracking-tight"
          />
          <MainText
            tag="p"
            title="Redirecting you to login..."
            className="text-ui-muted text-base leading-relaxed"
          />
        </>
      );
    }

    if (status === "error") return <VerifyEmailError error={error} />;

    return (
      <>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
        </div>
        <MainText
          tag="h1"
          title="Verifying your email"
          className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-4 tracking-tight"
        />
        <MainText
          tag="p"
          title="We are checking the secure token. Please wait a few seconds."
          className="text-ui-muted text-base leading-relaxed max-w-xs mx-auto"
        />
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary-1 px-4 py-12">
      <div className="w-full max-w-lg bg-light-white dark:bg-dark-primary-3 rounded-2xl shadow-2xl p-8 md:p-12 border border-ui-borderLight dark:border-brand-accent/10 text-center">
        {renderContent()}
      </div>
    </div>
  );
};

const VerifyEmailProcess = () => {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailProcess;
