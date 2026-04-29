import React from "react";
import MainText from "@/Components/Common/MainText";
import CircularProgress from "@/Components/Common/Progress/CircularProgress";

const DetailedMetrics = ({ scorePercentage, colorClass, finalFeedback, duration, questionsLabel, averageResponseTimeSeconds, accuracyLabel }) => {
  return (
    <div className="bg-white dark:bg-dark-primary-4 rounded-[20px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-6 flex-1">
        <CircularProgress percentage={scorePercentage} colorClass={colorClass} />
        <div className="flex-1 max-w-lg">
          <MainText tag="h2" title="Performance Summary" className="text-base font-semibold text-ui-textMain dark:text-white mb-1" />
          <MainText tag="p" title={finalFeedback} className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed line-clamp-2" />
        </div>
      </div>

      <div className="flex items-center gap-8 shrink-0 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="hidden md:block w-px h-12 bg-ui-borderLight dark:bg-ui-border" />
        
        <div className="flex gap-8 min-w-max">
          <div>
            <MainText title={"Duration"} className="text-[10px] uppercase font-bold tracking-wider text-ui-textMuted dark:text-ui-muted mb-1" />
            <MainText title={duration || "N/A"} className="text-sm font-bold text-ui-textMain dark:text-white" />
          </div>
          <div>
            <MainText title={"Questions"} className="text-[10px] uppercase font-bold tracking-wider text-ui-textMuted dark:text-ui-muted mb-1" />
            <MainText title={questionsLabel} className="text-sm font-bold text-ui-textMain dark:text-white" />
          </div>
          <div>
            <MainText title={"Avg. Time"} className="text-[10px] uppercase font-bold tracking-wider text-ui-textMuted dark:text-ui-muted mb-1" />
            <MainText className="text-sm font-bold text-ui-textMain dark:text-white" title={averageResponseTimeSeconds || "N/A"} />
          </div>
          <div>
            <MainText title={"Accuracy"} className="text-[10px] uppercase font-bold tracking-wider text-ui-textMuted dark:text-ui-muted mb-1" />
            <MainText title={accuracyLabel} className="text-sm font-bold text-status-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMetrics;
