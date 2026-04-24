"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { AlertCircle } from "lucide-react";

const JobsError = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className="bg-status-error/10 p-5 rounded-full mb-4">
        <AlertCircle className="w-10 h-10 text-status-error" />
      </div>
      <MainText tag="h2" className="text-xl font-bold text-ui-textMain dark:text-white mb-2">
        Error Loading Jobs
      </MainText>
      <MainText tag="p" className="text-sm text-ui-textMuted dark:text-ui-muted max-w-md">
        {error || "An unexpected error occurred while fetching the latest opportunities. Please try again later."}
      </MainText>
    </div>
  );
};

export default JobsError;
