"use client";
import React from "react";
import { Mail } from "lucide-react";
import MainText from "@/Components/Common/MainText";

const VerifyEmailRequest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary-1 px-4 py-12">
      <div className="w-full max-w-lg bg-dark-primary-3 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-500/10 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
            <Mail className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <MainText
          tag="h1"
          title="Verify your email address"
          className="text-3xl font-extrabold text-white mb-4 tracking-tight"
        />
        <MainText
          tag="p"
          title="Please check your email inbox and click on the provided link to verify your account"
          className="text-dark-gray text-base leading-relaxed max-w-sm mx-auto"
        />
      </div>
    </div>
  );
};

export default VerifyEmailRequest;
