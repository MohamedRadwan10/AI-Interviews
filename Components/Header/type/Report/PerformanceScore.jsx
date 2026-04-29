import React from "react";
import MainText from "@/Components/Common/MainText";

const PerformanceScore = ({ scorePercentage, scoreLevel, levelLabel }) => {
  return (
    <div className="bg-brand-primary rounded-[24px] p-6 shadow-lg shadow-brand-primary/20 text-white flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <MainText title="Overall Score" className="text-sm font-medium opacity-90" />
        <MainText tag="span" title={scoreLevel} className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg uppercase" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-4xl font-black">{scorePercentage}%</div>
        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all duration-1000" style={{ width: `${scorePercentage}%` }} />
        </div>
      </div>
      <MainText title={levelLabel} className="text-sm font-semibold mt-4" />
    </div>
  );
};

export default PerformanceScore;
