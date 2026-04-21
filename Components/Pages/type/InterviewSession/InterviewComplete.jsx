import React from "react";
import { CheckCircle2 } from "lucide-react";
import MainText from "../../../Common/MainText";
import MainButton from "../../../Common/MainButton";

export const InterviewComplete = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center animate-in zoom-in-95 duration-500">
    <div className="w-24 h-24 bg-status-success/10 rounded-full flex items-center justify-center mb-2">
      <CheckCircle2 className="w-12 h-12 text-status-success" />
    </div>
    <MainText tag="h2" className="text-3xl font-bold text-ui-textMain dark:text-white">
      Interview Complete!
    </MainText>
    <MainText className="text-ui-textMuted max-w-lg">
      {message || "Your responses have been successfully submitted and your session is now closed. Your report is being generated and will be available in your dashboard soon."}
    </MainText>
    <MainButton 
      onClick={() => window.location.href = '/intelliHire'} 
      className="bg-brand-primary text-white px-8 py-3 mt-4 text-lg"
    >
      Return to Dashboard
    </MainButton>
  </div>
);
