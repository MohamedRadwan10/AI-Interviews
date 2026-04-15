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
        <Link href="/login" className="flex items-center gap-2 text-sm text-dark-gray hover:text-dark-white transition-colors">
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
              className: "w-12 h-16 sm:w-14 sm:h-20 text-center text-3xl font-bold bg-dark-primary-1 border-2 border-gray-700/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-white transition-all shadow-2xl mx-1 sm:mx-2 focus:outline-none"
            }
          }}
        />
      </div>

      <MainButton 
        onClick={() => onSubmit()} 
        isLoading={isLoading}
        className="w-full flex justify-center items-center py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl font-bold shadow-2xl transform active:scale-[0.98] transition-all border-none"
      >
        {get(config, "submitButtonText")}
      </MainButton>

      <div className="text-center">
        <MainText title={footerText} className="text-dark-gray text-sm mr-1" />
        <button className="text-blue-500 text-sm font-semibold hover:underline">
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
        <Link href={get(footerLink, "href")} className="text-sm text-dark-gray hover:text-dark-white transition-colors">
          <MainText title={get(footerLink, "text")} />
        </Link>
      </div>
    </div>
  );
};
