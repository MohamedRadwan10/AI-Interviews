"use client";
import React from "react";
import { ProgressBar } from "primereact/progressbar";
import MainText from "@/Components/Common/MainText";
import { TrendingUp, MessageSquare } from "lucide-react";
import { map } from "lodash-es";

const ReportSidebar = ({ skillAnalysis, strengthPoints, weaknessesPoints }) => {
  const renderPoints = (points) => {
    if (!points) return <MainText className="text-sm text-ui-textMuted">N/A</MainText>;
    return points.split("\n").map((point, idx) => {
      const cleanPoint = point.replace(/^\*\s*/, "").trim();
      if (!cleanPoint) return null;
      return <MainText key={idx} className="text-sm text-ui-textMain dark:text-ui-muted leading-relaxed block">{cleanPoint}</MainText>;
    });
  };

  const colors = ["#7C3AED", "#10B981", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white dark:bg-[#1a1d24] rounded-[20px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-brand-primary" />
          <MainText tag="h3" className="text-base font-semibold text-ui-textMain dark:text-white">Skills Analysis</MainText>
        </div>
        <div className="space-y-5">
          {skillAnalysis && skillAnalysis.length > 0 ? (
            map(skillAnalysis, (skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <MainText className="font-medium text-ui-textMain dark:text-white">{skill.skillName}</MainText>
                  <MainText className="text-ui-textMuted dark:text-ui-muted font-medium">{skill.score} %</MainText>
                </div>
                <ProgressBar 
                  value={skill.score} 
                  showValue={false} 
                  style={{ height: '6px' }} 
                  color={colors[idx % colors.length]}
                />
              </div>
            ))
          ) : (
            <MainText className="text-sm text-ui-textMuted dark:text-ui-muted">No skills data available.</MainText>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1d24] rounded-[20px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-status-success" />
          <MainText tag="h3" className="text-base font-semibold text-ui-textMain dark:text-white">Strengths</MainText>
        </div>
        <div className="space-y-3">
          {renderPoints(strengthPoints)}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1d24] rounded-[20px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-status-error" />
          <MainText tag="h3" className="text-base font-semibold text-ui-textMain dark:text-white">Weaknesses</MainText>
        </div>
        <div className="space-y-3">
          {renderPoints(weaknessesPoints)}
        </div>
      </div>
    </div>
  );
};

export default ReportSidebar;
