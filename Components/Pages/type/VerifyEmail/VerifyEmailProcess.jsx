import React from "react";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import MainText from "@/Components/Common/MainText";
import { CheckCircle2, XCircle } from "lucide-react";

const VerifyEmailProcess = () => {
  const { status, error } = useVerifyEmail();

  const renderContent = () => {
    if (status === "success") {
      return (
        <>
          <div className="flex justify-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
          </div>
          <MainText
            tag="h1"
            title="Email Verified!"
            className="text-3xl font-extrabold text-white mb-4 tracking-tight"
          />
          <MainText
            tag="p"
            title="Redirecting you to login..."
            className="text-dark-gray text-base leading-relaxed"
          />
        </>
      );
    }

    if (status === "error") {
      return (
        <>
          <div className="flex justify-center mb-8">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <MainText
            tag="h1"
            title="Verification Failed"
            className="text-3xl font-extrabold text-white mb-4 tracking-tight"
          />
          <MainText
            tag="p"
            title={error}
            className="text-red-400 text-base leading-relaxed"
          />
        </>
      );
    }

    return (
      <>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <MainText
          tag="h1"
          title="Verifying your email"
          className="text-3xl font-extrabold text-white mb-4 tracking-tight"
        />
        <MainText
          tag="p"
          title="We are checking the secure token. Please wait a few seconds."
          className="text-dark-gray text-base leading-relaxed max-w-xs mx-auto"
        />
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary-1 px-4 py-12">
      <div className="w-full max-w-lg bg-dark-primary-3 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-500/10 text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmailProcess;
