"use client";
import React from "react";
import { get } from "lodash-es";
import { InputOtp } from "primereact/inputotp";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainForm from "@/Components/Common/MainForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const EmailStep = ({ config, onSubmit, isLoading }) => {
  return (
    <div className="w-full">
      <MainForm config={config} onSubmit={onSubmit} isLoading={isLoading} />
      <div className="flex justify-center mt-6">
        <Link href="/login" className="flex items-center gap-2 text-sm text-ui-muted hover:text-brand-primary transition-colors">
          <ArrowLeft size={16} />
          <MainText title="Back to Login" />
        </Link>
      </div>
    </div>
  );
};

export const OTPStep = ({ config, otp, onOtpChange, onSubmit, isLoading }) => {
  const footerLink = get(config, "footerLinks[0]");
  const footerText = get(config, "footerText");

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-center otp-container">
        <InputOtp
          value={otp}
          onChange={(e) => onOtpChange(e.value)}
          length={6}
          disabled={isLoading}
          pt={{
            input: {
              className: "w-12 h-16 sm:w-14 sm:h-20 text-center text-3xl font-bold bg-light-primary dark:bg-dark-primary-1 border-2 border-ui-borderLight dark:border-ui-border/50 rounded-2xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 text-ui-textMain dark:text-white transition-all shadow-2xl mx-1 sm:mx-2 focus:outline-none"
            }
          }}
        />
      </div>

      <MainButton 
        onClick={() => onSubmit()} 
        isLoading={isLoading}
        className="w-full flex justify-center items-center py-5 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primaryDark hover:to-brand-secondaryDark text-white rounded-2xl font-bold shadow-2xl transform active:scale-[0.98] transition-all border-none"
      >
        {get(config, "submitButtonText")}
      </MainButton>

      <div className="text-center">
        <MainText title={footerText} className="text-ui-textMuted dark:text-ui-muted text-sm mr-1" />
        <button className="text-brand-accent text-sm font-semibold hover:underline">
          {get(footerLink, "text")}
        </button>
      </div>
    </div>
  );
};

export const PasswordStep = ({ config, onSubmit, isLoading }) => {
  const footerLink = get(config, "footerLinks[0]");

  return (
    <div className="w-full">
      <MainForm config={config} onSubmit={onSubmit} isLoading={isLoading} />
      <div className="flex justify-center mt-6">
        <Link href={get(footerLink, "href")} className="text-sm text-ui-muted hover:text-brand-primary transition-colors">
          <MainText title={get(footerLink, "text")} />
        </Link>
      </div>
    </div>
  );
};
