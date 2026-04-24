"use client";
import React, { Suspense } from "react";
import { get } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import { Briefcase, Play, Clock } from "lucide-react";
import MainButton from "@/Components/Common/MainButton";
import { useNavigation } from "@/hooks/common";

const ActiveSessionCardContent = (props) => {
  const { navigateTo } = useNavigation();
  const session = props.session || props;

  const jobTitle = get(session, "jobtitle") || get(session, "jobTitle") || "Unknown Job";
  const sessionId = get(session, "sessionid") || get(session, "sessionId");
  const jobId = get(session, "jobid") || get(session, "jobId");

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all hover:shadow-md h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-ui-borderLight dark:border-ui-border bg-brand-primary/10 text-brand-primary shrink-0">
          <Briefcase className="w-6 h-6" />
        </div>
        <div>
          <MainText tag="h3" title={jobTitle} className="font-semibold text-lg text-ui-textMain dark:text-white" />
          <div className="flex items-center gap-2 text-ui-textMuted dark:text-ui-muted text-sm mt-0.5">
             <MainText tag="span" title="In Progress" className="text-brand-primary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Active Session
             </MainText>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <MainText title={`Session ID: ${sessionId?.substring(0, 8)}...`} className="text-xs text-ui-muted" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-ui-borderLight dark:border-ui-border mt-auto">
        <MainText className="text-xs text-ui-muted">
          Resume your interview
        </MainText>
        <MainButton 
          onClick={() => navigateTo(`/intelliHire/interview-session/${jobId}`)} 
          className="text-sm font-semibold bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition-colors"
        >
          <Play className="w-4 h-4" /> Resume
        </MainButton>
      </div>
    </div>
  );
};

const ActiveSessionCard = (props) => {
  return (
    <Suspense fallback={null}>
      <ActiveSessionCardContent {...props} />
    </Suspense>
  );
};

export default ActiveSessionCard;
