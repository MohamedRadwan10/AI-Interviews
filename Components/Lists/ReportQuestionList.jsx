"use client";
import React from "react";
import MainCard from "@/Components/Common/Cards";
import MainText from "@/Components/Common/MainText";
import { map } from "lodash-es";
import { List } from "lucide-react";

const ReportQuestionList = ({ scoreBreakdown }) => {
  if (!scoreBreakdown || scoreBreakdown.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-brand-primary/10 p-5 rounded-full mb-4">
          <i className="pi pi-list text-3xl text-brand-primary" />
        </div>
        <MainText tag="h3" className="text-lg font-semibold text-ui-textMain dark:text-white mb-1">
          No Questions Available
        </MainText>
        <MainText tag="p" className="text-sm text-ui-textMuted dark:text-ui-muted">
          Question details will appear here once the report is generated.
        </MainText>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-brand-primary" />
          <MainText tag="h3" className="text-base font-semibold text-ui-textMain dark:text-white">
            Question Analysis
          </MainText>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-medium text-ui-textMain dark:text-white">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-success"></span>
            Good
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-warning"></span>
            Average
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-error"></span>
            Needs Improvement
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
      {map(scoreBreakdown, (item) => (
        <MainCard key={item.index} type="reportQuestion" data={item} />
      ))}
      </div>
    </div>
  );
};

export default ReportQuestionList;
