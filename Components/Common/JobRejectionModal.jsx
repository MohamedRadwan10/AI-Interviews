"use client";
import React from "react";
import CommonModal from "@/Components/Common/CommonModal";
import MainText from "@/Components/Common/MainText";
import CircularProgress from "@/Components/Common/Progress/CircularProgress";
import { ProgressBar } from "primereact/progressbar";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { get, map } from "lodash-es";
import { getScoreColor, getMatchColor } from "@/Utils/Func/Common";

const getStatusIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes("excellent") || l.includes("good")) return <CheckCircle2 className="w-6 h-6 text-status-success" />;
  if (l.includes("average") || l.includes("fair")) return <AlertCircle className="w-6 h-6 text-status-warning" />;
  return <XCircle className="w-6 h-6 text-status-error" />;
};

const JobRejectionModal = ({ visible, onHide, result }) => {
  if (!result) return null;

  const overallScore = get(result, "overallMatchScore", 0);
  const matchLabel = get(result, "matchLabel", "Poor Match");
  const matchSummary = get(result, "matchSummary", "");
  const dimensionScores = get(result, "dimensionScores", {});
  const matchColorClass = getMatchColor(matchLabel);

  return (
    <CommonModal
      visible={visible}
      onHide={onHide}
      header="Job Application Check"
      width="600px"
      className="rejection-modal"
    >
      <div className="flex flex-col gap-6 py-2">
        <div className="flex flex-col items-center text-center gap-3 p-6 bg-light-primary dark:bg-dark-primary-3 rounded-2xl border border-ui-borderLight dark:border-ui-border/50">
          <CircularProgress percentage={Math.round(overallScore)} colorClass={matchColorClass} />
          <div className="flex items-center gap-2 mt-2">
            {getStatusIcon(matchLabel)}
            <MainText tag="h2" className={`text-xl font-bold ${matchColorClass}`}>
              {matchLabel}
            </MainText>
          </div>
          <MainText className="text-ui-textMuted dark:text-ui-muted max-w-md leading-relaxed text-sm">
            {matchSummary}
          </MainText>
        </div>

        <div className="flex flex-col gap-4 px-2">
          <MainText tag="h3" className="font-semibold text-ui-textMain dark:text-white flex items-center gap-2">
            Qualification Breakdown
          </MainText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {map(dimensionScores, (score, key) => {
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <MainText className="text-ui-textMuted dark:text-ui-muted capitalize">{label}</MainText>
                    <MainText className="text-ui-textMain dark:text-white">{score}%</MainText>
                  </div>
                  <ProgressBar 
                    value={score} 
                    showValue={false} 
                    style={{ height: '6px' }} 
                    color={getScoreColor(score)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-status-error/10 border border-status-error/20 p-4 rounded-xl flex items-start gap-3 mt-2">
          <AlertCircle className="w-5 h-5 text-status-error shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <MainText className="text-status-error font-semibold text-sm">Action Required</MainText>
            <MainText className="text-status-error/80 text-xs leading-relaxed">
              Unfortunately, your profile does not currently meet the minimum requirements for this role. Consider updating your skills and experience to improve your match score.
            </MainText>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default JobRejectionModal;
