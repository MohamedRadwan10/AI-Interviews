"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import DownloadReport from "@/Components/Common/DownloadReport";
import { API_BASE_URL } from "@/Config/apiRegistry";
import CandidateInfo from "@/Components/Header/type/Report/CandidateInfo";
import PerformanceScore from "@/Components/Header/type/Report/PerformanceScore";
import DetailedMetrics from "@/Components/Header/type/Report/DetailedMetrics";
import { useReportHeader } from "@/hooks/useReport";
import { REPORT_STATUS_CONFIG } from "@/Config/InterviewConfig";

const ReportHeader = (props) => {
  const { 
    sessionId, feedback, duration, averageResponseTimeSeconds,
    fullName, email, phoneNumber, roleApplied, company, reportStatus 
  } = props;

  const {
    level,
    scorePercentage,
    questionsLabel,
    accuracyLabel,
    formattedDate,
    candidatePhoto,
    downloadFileName
  } = useReportHeader(props);

  const renderStatusBanner = () => {
    const s = String(reportStatus || "Pending").toLowerCase();
    const config = REPORT_STATUS_CONFIG[s] || REPORT_STATUS_CONFIG.pending;
    const IconComponent = config.icon;

    return (
      <div className={`w-full mb-6 p-4 rounded-[20px] bg-gradient-to-r ${config.bgClass} flex items-center gap-4 shadow-sm`}>
        <div className={`p-3 rounded-xl shrink-0 text-xl ${config.iconBgClass}`}>
          {IconComponent && <IconComponent size={24} />}
        </div>
        <div>
          <MainText tag="h3" title={config.title} className={`font-bold text-base ${config.textClass}`} />
          <MainText title={config.desc} className="text-sm text-ui-textMuted dark:text-ui-muted mt-0.5" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <MainText title="Interview Session Report" className="text-2xl font-bold text-ui-textMain dark:text-white" />
          <MainText title={`Generated on ${formattedDate}`} className="text-sm text-ui-textMuted dark:text-ui-muted mt-1" />
        </div>
        <DownloadReport
          downloadUrl={`${API_BASE_URL}/Report/${sessionId}`}
          fileName={downloadFileName}
          printElementId="report-content"
        />
      </div>

      {renderStatusBanner()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CandidateInfo 
          photo={candidatePhoto} 
          fullName={fullName} 
          email={email} 
          phoneNumber={phoneNumber} 
          roleApplied={roleApplied} 
          company={company} 
          reportStatus={reportStatus}
        />
        <PerformanceScore 
          scorePercentage={scorePercentage} 
          scoreLevel={props.scoreLevel} 
          levelLabel={level.label} 
        />
      </div>

      <DetailedMetrics 
        scorePercentage={scorePercentage}
        colorClass={level.circleColor}
        finalFeedback={feedback || "Candidate completed the interview successfully."}
        duration={duration}
        questionsLabel={questionsLabel}
        averageResponseTimeSeconds={averageResponseTimeSeconds}
        accuracyLabel={accuracyLabel}
      />
    </div>
  );
};

export default ReportHeader;
