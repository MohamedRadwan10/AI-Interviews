"use client";
import React, { useState, useMemo } from "react";
import { getVal } from "@/Utils/Func/Common";
import MainText from "@/Components/Common/MainText";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import MainButton from "@/Components/Common/MainButton";

const ReportQuestionCard = (props) => {
  const data = props.data || props;
  const [isExpanded, setIsExpanded] = useState(false);

  const gv = (path, fb) => getVal(data, null, path, fb);
  const index = gv("index", 0);
  const question = gv("question", "");
  const answer = gv("answer", "No answer provided");
  const idealAnswer = gv("idealAnswer", "");
  const responseTime = gv("responseTime", "");
  const type = gv("type", "");
  
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const qLabel = `Q${index}`;

  const expansionIcon = useMemo(() => {
    return isExpanded ? <ChevronUp className="w-5 h-5 text-ui-muted" /> : <ChevronDown className="w-5 h-5 text-ui-muted" />;
  }, [isExpanded]);

  const idealAnswerContent = useMemo(() => {
    if (!idealAnswer) return null;
    return (
      <div className="rounded-xl bg-status-success/5 border border-status-success/20 p-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-status-success" />
          <MainText tag="h4" title="Ideal Answer" className="text-xs font-semibold text-status-success uppercase tracking-wider" />
        </div>
        <div className="space-y-2 mt-2">
          {idealAnswer.split("\n").map((point, idx) => {
            const cleanPoint = point.replace(/^\-\s*/, "").trim();
            if (!cleanPoint) return null;
            return (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-status-success mt-1">•</span>
                <MainText title={cleanPoint} className="text-sm text-ui-textMain dark:text-ui-muted leading-relaxed" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [idealAnswer]);

  const expandedContent = useMemo(() => {
    if (!isExpanded) return null;
    return (
      <div className="px-5 pb-5 pt-4 space-y-4 animate-[fadeIn_0.2s_ease-in-out]">
        <div className="rounded-xl bg-light-main dark:bg-dark-primary-3 p-4">
          <MainText tag="h4" title="Your Answer" className="text-xs font-semibold text-ui-textMuted dark:text-ui-muted mb-2 uppercase tracking-wider" />
          <MainText tag="p" title={answer} className="text-sm text-ui-textMain dark:text-white leading-relaxed" />
        </div>
        {idealAnswerContent}
      </div>
    );
  }, [isExpanded, answer, idealAnswerContent]);

  return (
    <div className="rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all hover:shadow-md duration-200 overflow-hidden">
      <MainButton
        onClick={toggleExpand}
        className="flex items-center gap-4 w-full p-5 text-left cursor-pointer"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary font-bold text-sm shrink-0">
          {qLabel}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <MainText tag="p" title={question} className="text-sm font-medium text-ui-textMain dark:text-white truncate" />
          <div className="flex items-center gap-3">
            {type && (
              <MainText title={type} className="text-[10px] font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full" />
            )}
            {responseTime && (
              <MainText title={`Time: ${responseTime}s`} className="text-[10px] text-ui-textMuted dark:text-ui-muted font-medium" />
            )}
          </div>
        </div>
        <div className="flex items-center shrink-0">
          {expansionIcon}
        </div>
      </MainButton>

      {expandedContent}
    </div>
  );
};

export default ReportQuestionCard;
