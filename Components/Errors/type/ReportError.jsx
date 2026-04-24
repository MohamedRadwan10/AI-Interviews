"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { RefreshCw } from "lucide-react";
import { useNavigation } from "@/hooks/common";

const ReportError = ({ refetch }) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="bg-status-error/10 p-5 rounded-full">
          <i className="pi pi-exclamation-triangle text-3xl text-status-error" />
        </div>
        <MainText tag="h2" className="text-xl font-bold text-ui-textMain dark:text-white">
          Failed to Load Report
        </MainText>
        <MainText tag="p" className="text-sm text-ui-textMuted dark:text-ui-muted max-w-md">
          Something went wrong while fetching your report. Please try again.
        </MainText>
        <div className="flex gap-3">
          <MainButton
            onClick={refetch}
            className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-primaryDark transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </MainButton>
          <MainButton
            onClick={() => navigateTo("/intelliHire/jobs")}
            className="bg-white dark:bg-dark-primary-3 text-ui-textMain dark:text-white border border-ui-borderLight dark:border-ui-border px-5 py-2.5 rounded-xl font-semibold hover:bg-light-main dark:hover:bg-dark-primary-4 transition-colors"
          >
            Browse Jobs
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default ReportError;
