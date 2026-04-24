"use client";
import React, { useState } from "react";
import { get } from "lodash-es";
import MainText from "../../MainText";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import MainButton from "../../MainButton";

const ReportQuestionCard = (props) => {
  const data = props.data || props;
  const [isExpanded, setIsExpanded] = useState(false);

  const index = get(data, "index", 0);
  const question = get(data, "question", "");
  const answer = get(data, "answer", "No answer provided");
  const idealAnswer = get(data, "idealAnswer", "");

  return (
    <div className="rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all hover:shadow-md duration-200 overflow-hidden">
      <MainButton
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-4 w-full p-5 text-left cursor-pointer"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary font-bold text-sm shrink-0">
          Q{index}
        </div>
        <div className="flex-1 min-w-0">
          <MainText tag="p" className="text-sm font-medium text-ui-textMain dark:text-white truncate">
            {question}
          </MainText>
        </div>
        <div className="flex items-center shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-ui-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-ui-muted" />
          )}
        </div>
      </MainButton>

      {isExpanded && (
        <div className="px-5 pb-5 pt-4 space-y-4 animate-[fadeIn_0.2s_ease-in-out]">
          <div className="rounded-xl bg-light-main dark:bg-dark-primary-3 p-4">
            <MainText tag="h4" className="text-xs font-semibold text-ui-textMuted dark:text-ui-muted mb-2 uppercase tracking-wider">
              Your Answer
            </MainText>
            <MainText tag="p" className="text-sm text-ui-textMain dark:text-white leading-relaxed">
              {answer}
            </MainText>
          </div>

          {idealAnswer && (
            <div className="rounded-xl bg-status-success/5 border border-status-success/20 p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-status-success" />
                <MainText tag="h4" className="text-xs font-semibold text-status-success uppercase tracking-wider">
                  Ideal Answer
                </MainText>
              </div>
              <div className="space-y-2 mt-2">
                {idealAnswer.split("\n").map((point, idx) => {
                  const cleanPoint = point.replace(/^\-\s*/, "").trim();
                  if (!cleanPoint) return null;
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-status-success mt-1">•</span>
                      <MainText className="text-sm text-ui-textMain dark:text-ui-muted leading-relaxed">
                        {cleanPoint}
                      </MainText>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportQuestionCard;
