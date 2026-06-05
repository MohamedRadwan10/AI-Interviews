"use client";
import React from "react";
import CommonModal from "@/Components/Common/CommonModal";
import MainText from "@/Components/Common/MainText";
import CircularProgress from "@/Components/Common/Progress/CircularProgress";
import MainButton from "@/Components/Common/MainButton";
import { ProgressBar } from "primereact/progressbar";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { get, map } from "lodash-es";
import { getScoreColor, getMatchColor } from "@/Utils/Func/Common";

const getStatusIcon = (label) => {
  const l = label.toLowerCase();
  if ( l.includes("Good") || l.includes("Perfect") || l.includes("Strong")) return <CheckCircle2 className="w-6 h-6 text-status-success" />;
  if ( l.includes("Partial") || l.includes("Weak")) return <AlertCircle className="w-6 h-6 text-status-warning" />;
  return <XCircle className="w-6 h-6 text-status-error" />;
};

const JobRejectionModal = ({ visible, onHide, result, onProceed }) => {
  if (!result) return null;

  const overallScore = get(result, "overallMatchScore", 0);
  const matchLabel = get(result, "matchLabel", "Poor Match");
  const matchSummary = get(result, "matchSummary", "");
  const dimensionScores = get(result, "dimensionScores", {});
  const matchColorClass = getMatchColor(matchLabel);
  const isHardRejection = result.rejected || matchLabel === "Poor Match";

  return (
    <CommonModal
      visible={visible}
      onHide={onHide}
      header={isHardRejection ? "Application Blocked" : "Job Application Match Details"}
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

        {isHardRejection ? (
          <div className="bg-status-error/10 border border-status-error/20 p-4 rounded-xl flex items-start gap-3 mt-2">
            <AlertCircle className="w-5 h-5 text-status-error shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <MainText className="text-status-error font-semibold text-sm">Action Required</MainText>
              <MainText className="text-status-error/80 text-xs leading-relaxed">
                Unfortunately, your profile does not currently meet the minimum requirements for this role. Consider updating your skills and experience to improve your match score.
              </MainText>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            <div className="bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <MainText className="text-brand-primary font-semibold text-sm">Matching Status</MainText>
                <MainText className="text-brand-primary/80 text-xs leading-relaxed">
                  {matchLabel === "Weak Match" || matchLabel === "Partial Match" 
                    ? "Your profile has a weak or partial match for this role. You can still choose to start the interview, or cancel to update your CV/skills first."
                    : "Great! Your profile is a good match for this role. You are eligible to start the interview."}
                </MainText>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-2">
              <MainButton 
                onClick={onHide} 
                className="bg-white dark:bg-dark-primary-3 text-ui-textMain dark:text-white border border-ui-borderLight dark:border-ui-border px-5 py-2.5 rounded-xl font-semibold hover:bg-light-main dark:hover:bg-dark-primary-4 transition-colors" 
                title="Decline" 
              />
              <MainButton 
                onClick={() => {
                  onHide();
                  if (onProceed) onProceed();
                }} 
                className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-primaryDark transition-colors" 
                title="Start Interview" 
              />
            </div>
          </div>
        )}
      </div>
    </CommonModal>
  );
};

export default JobRejectionModal;
