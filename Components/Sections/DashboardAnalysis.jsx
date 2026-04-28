import React, { useMemo } from "react";
import MainText from "@/Components/Common/MainText";
import { map } from "lodash-es";

export const DashboardAnalysis = ({ strengthPoints, improvements }) => {
  const noStrengthsMessage = useMemo(() => {
    if (strengthPoints?.length) return null;
    return <MainText className="text-sm text-ui-textMuted dark:text-ui-muted italic">No strength points recorded yet.</MainText>;
  }, [strengthPoints]);

  const noImprovementsMessage = useMemo(() => {
    if (improvements?.length) return null;
    return <MainText className="text-sm text-ui-textMuted dark:text-ui-muted italic">No improvements recorded yet.</MainText>;
  }, [improvements]);

  if (!strengthPoints?.length && !improvements?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm">
        <MainText tag="h3" className="text-lg font-bold text-ui-textMain dark:text-white mb-4">
          Overall Strength Points
        </MainText>
        <div className="space-y-3">
          {map(strengthPoints, (point, idx) => (
            <MainText key={idx} className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed">
              {point}
            </MainText>
          ))}
          {noStrengthsMessage}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-dark-primary-3 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm">
        <MainText tag="h3" className="text-lg font-bold text-ui-textMain dark:text-white mb-4">
          Overall Improvements
        </MainText>
        <div className="space-y-3">
          {map(improvements, (point, idx) => (
            <MainText key={idx} className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed">
              {point}
            </MainText>
          ))}
          {noImprovementsMessage}
        </div>
      </div>
    </div>
  );
};
