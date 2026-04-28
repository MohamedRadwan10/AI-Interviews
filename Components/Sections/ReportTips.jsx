"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { Lightbulb } from "lucide-react";
import { map } from "lodash-es";

const ReportTips = ({ improvementsTips }) => {
  if (!improvementsTips) return null;

  const tipsList = improvementsTips
    .split(/\||\n/)
    .map(point => point.replace(/^\*\s*/, "").trim())
    .filter(Boolean);

  if (tipsList.length === 0) return null;

  return (
    <div className="w-full mt-2">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Lightbulb className="w-5 h-5 text-brand-primary" />
        <MainText tag="h3" title={"Improvement Tips"} className="text-base font-semibold text-ui-textMain dark:text-white" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {map(tipsList, (tip, idx) => {
          let tipTitle = `Tip ${idx + 1}`;
          let tipDescription = tip;
          
          if (tip.includes(":")) {
            const parts = tip.split(":");
            tipTitle = parts[0].trim();
            tipDescription = parts.slice(1).join(":").trim();
          }

          const tipIndex = idx + 1;

          return (
            <div key={idx} className="bg-light-primary dark:bg-dark-primary-3 rounded-2xl p-5 flex items-start gap-4 border border-ui-borderLight/50 dark:border-ui-border/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-ui-textMain dark:bg-dark-primary-1 text-white font-bold text-xs shrink-0 mt-0.5">
                {tipIndex}
              </div>
              <div className="flex-1">
                <MainText tag="h4" title={tipTitle} className="text-sm font-semibold text-ui-textMain dark:text-white mb-1" />
                <MainText tag="p" title={tipDescription} className="text-xs text-ui-textMuted dark:text-ui-muted leading-relaxed" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportTips;
