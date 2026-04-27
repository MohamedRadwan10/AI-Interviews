import React from "react";
import MainText from "@/Components/Common/MainText";
import { Flag, ThumbsUp, ThumbsDown, Target, Activity } from "lucide-react";

const ReportRecommendation = ({ 
  recommendationReason, 
  redFlags, 
  performanceLabel, 
  hiringRecommendation 
}) => {
  if (!hiringRecommendation && !performanceLabel) return null;

  const isPositive = hiringRecommendation?.toLowerCase().includes("not") === false;
  
  return (
    <div className="bg-white dark:bg-dark-primary-4 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm overflow-hidden flex flex-col">
      <div className={`p-6 ${isPositive ? 'bg-status-success/10' : 'bg-status-error/10'} border-b border-ui-borderLight dark:border-ui-border`}>
        <div className="flex items-center gap-3">
           {isPositive ? <ThumbsUp className="w-6 h-6 text-status-success" /> : <ThumbsDown className="w-6 h-6 text-status-error" />}
           <MainText className={`text-lg font-bold ${isPositive ? 'text-status-success' : 'text-status-error'}`}>
             {hiringRecommendation || "Evaluation Result"}
           </MainText>
        </div>
        
        {performanceLabel && (
          <div className="flex items-center gap-2 mt-4 bg-white/60 dark:bg-black/20 w-fit px-3 py-1.5 rounded-full border border-ui-borderLight/50 dark:border-ui-border/50 backdrop-blur-sm">
            <Activity className="w-4 h-4 text-ui-textMuted dark:text-ui-muted" />
            <MainText className="text-xs font-semibold text-ui-textMain dark:text-white">
              {performanceLabel}
            </MainText>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-6">
        {recommendationReason && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-brand-primary" />
              <MainText className="text-xs font-bold uppercase tracking-wider text-ui-textMuted dark:text-ui-muted">
                Key Reason
              </MainText>
            </div>
            <MainText className="text-sm leading-relaxed text-ui-textMain dark:text-white">
              {recommendationReason}
            </MainText>
          </div>
        )}

        {redFlags && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flag className="w-4 h-4 text-status-error" />
              <MainText className="text-xs font-bold uppercase tracking-wider text-status-error">
                Red Flags Detected
              </MainText>
            </div>
            <div className="bg-status-error/5 border border-status-error/10 rounded-2xl p-4 space-y-3">
              {redFlags.split("|").map((flag, idx) => {
                const cleanFlag = flag.trim();
                if (!cleanFlag) return null;
                return (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-error mt-1.5 shrink-0" />
                    <MainText className="text-sm leading-relaxed text-ui-textMain dark:text-white">
                      {cleanFlag}
                    </MainText>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportRecommendation;
