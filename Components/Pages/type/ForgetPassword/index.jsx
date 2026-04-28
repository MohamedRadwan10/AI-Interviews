"use client";
import React, { useMemo } from "react";
import { getVal } from "@/Utils/Func/Common";
import { EmailStep, OTPStep, PasswordStep } from "@/Components/Pages/type/ForgetPassword/StepComponents";
import { useForgetPassword } from "@/hooks/useAuth";
import MainText from "@/Components/Common/MainText";
import { GenericError } from "@/Components/Errors";
import { forgetPasswordConfig } from "@/Config/FieldsConfig";

const ForgetPasswordPage = () => {
  const { step, otp, isLoading, error, handleEmailSubmit, handleOTPSubmit, handlePasswordSubmit, handleOtpChange } = useForgetPassword();

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return <EmailStep config={forgetPasswordConfig.emailStep} onSubmit={handleEmailSubmit} isLoading={isLoading} />;
      case 2:
        return <OTPStep config={forgetPasswordConfig.otpStep} otp={otp} onOtpChange={handleOtpChange} onSubmit={handleOTPSubmit} isLoading={isLoading} />;
      case 3:
        return <PasswordStep config={forgetPasswordConfig.passwordStep} onSubmit={handlePasswordSubmit} isLoading={isLoading} />;
      default:
        return null;
    }
  }, [step, handleEmailSubmit, handleOTPSubmit, handlePasswordSubmit, handleOtpChange, otp, isLoading]);

  const stepKey = step === 1 ? "emailStep" : step === 2 ? "otpStep" : "passwordStep";
  const config = getVal(forgetPasswordConfig, null, stepKey);
  const pageTitle = getVal(config, null, "pageTitle");
  const pageSubtitle = getVal(config, null, "pageSubtitle");

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary-1 px-4 py-12">
      <div className="w-full max-w-lg bg-light-white dark:bg-dark-primary-3 rounded-2xl shadow-2xl p-8 md:p-12 border border-ui-borderLight dark:border-brand-accent/10 backdrop-blur-sm">
        <div className="text-center mb-10">
          <MainText
            tag="h1"
            title={pageTitle}
            className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-3 tracking-tight"
          />
          <MainText
            tag="p"
            title={pageSubtitle}
            className="text-ui-textMuted dark:text-ui-muted text-lg"
          />
        </div>

        {stepContent}

        <GenericError error={error} className="mt-6" />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
