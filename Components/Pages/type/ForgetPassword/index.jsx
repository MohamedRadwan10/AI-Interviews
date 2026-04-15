"use client";
import React from "react";
import { get } from "lodash-es";
import { useForgetPassword } from "@/hooks/useForgetPassword";
import { forgetPasswordConfig } from "@/Config/FieldsConfig";
import { EmailStep, OTPStep, PasswordStep } from "./StepComponents";
import MainText from "@/Components/Common/MainText";

const ForgetPasswordPage = () => {
  const { step, otp, isLoading, error, handleEmailSubmit, handleOTPSubmit, handlePasswordSubmit, handleOtpChange } = useForgetPassword();

  const getStepContent = () => {
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
  };

  const config = get(forgetPasswordConfig, step === 1 ? "emailStep" : step === 2 ? "otpStep" : "passwordStep");

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary-1 px-4 py-12">
      <div className="w-full max-w-lg bg-light-white dark:bg-dark-primary-3 rounded-2xl shadow-2xl p-8 md:p-12 border border-ui-borderLight dark:border-brand-accent/10 backdrop-blur-sm">
        <div className="text-center mb-10">
          <MainText
            tag="h1"
            title={get(config, "pageTitle")}
            className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-3 tracking-tight"
          />
          <MainText
            tag="p"
            title={get(config, "pageSubtitle")}
            className="text-ui-textMuted dark:text-ui-muted text-sm leading-relaxed max-w-[280px] mx-auto"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-status-error/10 border border-status-error/20 text-status-error rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <div className="transition-all duration-500 ease-in-out">
          {getStepContent()}
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
