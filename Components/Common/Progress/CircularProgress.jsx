"use client";
import React from "react";
import { Knob } from "primereact/knob";
import MainText from "@/Components/Common/MainText";

const CircularProgress = ({ percentage, colorClass }) => {
  const colorMap = {
    "text-brand-primary": "#7C3AED",
    "text-status-success": "#10B981",
    "text-status-warning": "#F59E0B",
    "text-status-error": "#EF4444"
  };

  const activeColor = colorMap[colorClass] || "#7C3AED";

  return (
    <div className="relative flex items-center justify-center w-24 h-24 circular-progress-knob">
      <Knob 
        value={percentage} 
        size={90} 
        strokeWidth={6} 
        readOnly 
        showValue={false}
        valueColor={activeColor}
        rangeColor="var(--ui-border-light, #e2e8f0)"
      />
      <div className="absolute flex flex-col items-center justify-center">
        <MainText tag="span" className="text-xl font-bold text-ui-textMain dark:text-white leading-none">
          {percentage}%
        </MainText>
        <MainText tag="span" className="text-[10px] font-semibold text-ui-textMuted uppercase tracking-wider mt-1">
          Overall
        </MainText>
      </div>
      <style jsx global>{`
        .circular-progress-knob .p-knob {
          display: block;
        }
        .dark .circular-progress-knob path.p-knob-range {
          stroke: #2d3748;
        }
      `}</style>
    </div>
  );
};

export default CircularProgress;
