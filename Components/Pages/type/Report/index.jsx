"use client";
import React from "react";
import { useReport } from "@/hooks/useReport";
import ReportHeader from "@/Components/Header/ReportHeader";
import ReportSidebar from "@/Components/Sidebars/ReportSidebar";
import ReportQuestionList from "@/Components/Lists/ReportQuestionList";
import ReportTips from "@/Components/Sections/ReportTips";
import LoadingSkeleton from "@/Components/Common/LoadingSkeleton";
import { ReportError } from "@/Components/Errors";
import { useUserAccount } from "@/Context/UserAccountContext";
import ReportRecommendation from "@/Components/Sections/ReportRecommendation";

const ReportPage = ({ sessionId }) => {
  const { userId } = useUserAccount();
  const {
    overallScore, scoreLevel, totalQuestions, questionsAnswered, accuracyPercent,
    feedback, strengthPoints, weaknessesPoints, improvementsTips, skillAnalysis,
    scoreBreakdown, recommendationReason, redFlags, performanceLabel, hiringRecommendation,
    isLoading, error, refetch,
  } = useReport(sessionId, userId);

  if (isLoading) return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto"><LoadingSkeleton type="report" /></div>
    </div>
  );

  if (error) return <ReportError refetch={refetch} />;
  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div id="report-content" className="max-w-[1200px] mx-auto flex flex-col">
        <ReportHeader
          overallScore={overallScore}
          scoreLevel={scoreLevel}
          sessionId={sessionId}
          feedback={feedback}
          questionsAnswered={questionsAnswered}
          totalQuestions={totalQuestions}
          accuracyPercent={accuracyPercent}
        />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-6">
            <ReportRecommendation 
              recommendationReason={recommendationReason}
              redFlags={redFlags}
              performanceLabel={performanceLabel}
              hiringRecommendation={hiringRecommendation}
            />
            <ReportSidebar
              skillAnalysis={skillAnalysis}
              strengthPoints={strengthPoints}
              weaknessesPoints={weaknessesPoints}
            />
          </div>

          <div className="w-full lg:w-2/3">
            <ReportQuestionList scoreBreakdown={scoreBreakdown} />
          </div>
        </div>

        <div className="mt-4">
          <ReportTips improvementsTips={improvementsTips} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
