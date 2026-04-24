"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { AlertCircle } from "lucide-react";

const JobDetailsError = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="flex flex-col items-center text-center gap-3">
        <AlertCircle className="w-12 h-12 text-status-error opacity-80" />
        <MainText className="text-status-error font-semibold text-lg">
          {error || "Failed to load job details."}
        </MainText>
        <MainText className="text-ui-textMuted text-sm max-w-xs">
          We couldn't retrieve the job information. Please check your connection or try again.
        </MainText>
      </div>
    </div>
  );
};

export default JobDetailsError;
