"use client";
import React from "react";
import { get } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import DownloadReport from "@/Components/Common/DownloadReport";
import CircularProgress from "@/Components/Common/Progress/CircularProgress";
import { API_BASE_URL } from "@/Config/apiRegistry";

const ReportHeader = ({ overallScore, scoreLevel, sessionId, feedback, questionsAnswered, totalQuestions, accuracyPercent }) => {
  const scoreLevelConfig = {
    excellent: { label: "Excellent Performance", color: "text-brand-primary", circleColor: "text-brand-primary" },
    good: { label: "Good Performance", color: "text-brand-primary", circleColor: "text-brand-primary" },
    average: { label: "Average Performance", color: "text-status-warning", circleColor: "text-status-warning" },
    needsImprovement: { label: "Needs Improvement", color: "text-status-error", circleColor: "text-status-error" },
  };

  const level = get(scoreLevelConfig, scoreLevel, scoreLevelConfig.average);
  const scorePercentage = Math.round(accuracyPercent || 0);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-end mb-4">
        <DownloadReport
          downloadUrl={`${API_BASE_URL}/Report/${sessionId}`}
          fileName={`report-${sessionId}`}
          printElementId="report-content"
        />
      </div>

      <div className="bg-white dark:bg-[#1a1d24] rounded-[20px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center gap-6 flex-1">
          <CircularProgress percentage={scorePercentage} colorClass={level.circleColor} />
          <div className="flex-1 max-w-lg">
            <MainText tag="h2" className="text-lg font-semibold text-ui-textMain dark:text-white mb-2">
              {level.label}
            </MainText>
            <MainText tag="p" className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed line-clamp-3">
              {feedback || "Candidate completed the interview successfully."}
            </MainText>
          </div>
        </div>

        <div className="flex items-center gap-8 shrink-0 w-full md:w-auto">
          <div className="hidden md:block w-px h-16 bg-ui-borderLight dark:bg-ui-border" />
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full md:w-auto">
            <div>
              <MainText className="text-xs text-ui-textMuted dark:text-ui-muted mb-1">Duration</MainText>
              <MainText className="text-sm font-semibold text-ui-textMain dark:text-white">N/A</MainText>
            </div>
            <div>
              <MainText className="text-xs text-ui-textMuted dark:text-ui-muted mb-1">Questions</MainText>
              <MainText className="text-sm font-semibold text-ui-textMain dark:text-white">{questionsAnswered}/{totalQuestions}</MainText>
            </div>
            <div>
              <MainText className="text-xs text-ui-textMuted dark:text-ui-muted mb-1">Avg. Response Time</MainText>
              <MainText className="text-sm font-semibold text-ui-textMain dark:text-white">
                <span className="text-xs font-normal text-ui-textMuted block">Time to start speaking</span>
              </MainText>
            </div>
            <div>
              <MainText className="text-xs text-ui-textMuted dark:text-ui-muted mb-1">Accuracy</MainText>
              <MainText className="text-sm font-semibold text-status-success">{scorePercentage}%</MainText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
