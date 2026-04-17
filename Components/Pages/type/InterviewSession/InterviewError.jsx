import React from "react";
import { AlertCircle } from "lucide-react";
import MainText from "../../../Common/MainText";
import MainButton from "../../../Common/MainButton";

export const InterviewError = ({ error }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
    <AlertCircle className="w-16 h-16 text-status-warning mb-2" />
    <MainText tag="h2" className="text-2xl font-bold">Session Access Denied</MainText>
    <MainText className="text-ui-textMuted max-w-md">
      You might already have an active session running on another device, or you have already completed this interview. Please check your dashboard or contact support if you believe this is a mistake.
    </MainText>
    
    <div className="mt-4 p-4 bg-status-error/10 text-status-error dark:bg-status-error/20 dark:text-status-error rounded-xl text-sm border border-status-error/20 font-medium max-w-md">
      {error}
    </div>

    <div className="flex gap-4 mt-6">
      <MainButton onClick={() => window.location.href = '/intelliHire'} className="bg-brand-primary text-white px-8 py-3">
        Return to Dashboard
      </MainButton>
    </div>
  </div>
);
