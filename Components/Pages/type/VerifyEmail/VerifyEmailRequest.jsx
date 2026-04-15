"use client";
import React from "react";
import { Mail } from "lucide-react";
import MainText from "@/Components/Common/MainText";

const VerifyEmailRequest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary-1 px-4 py-12">
      <div className="w-full max-w-lg bg-light-white dark:bg-dark-primary-3 rounded-2xl shadow-2xl p-8 md:p-12 border border-ui-borderLight dark:border-brand-accent/10 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-brand-accent/10 rounded-2xl">
            <Mail className="w-12 h-12 text-brand-accent" />
          </div>
        </div>
        
        <MainText
          tag="h1"
          title="Verify your email address"
          className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-4 tracking-tight"
        />
        <MainText
          tag="p"
          title="Please check your email inbox and click on the provided link to verify your account"
          className="text-ui-muted text-base leading-relaxed max-w-sm mx-auto"
        />
      </div>
    </div>
  );
};

export default VerifyEmailRequest;
