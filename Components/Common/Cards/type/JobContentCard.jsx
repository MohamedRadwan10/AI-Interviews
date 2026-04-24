import React from "react";
import { get } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import { FileText, CheckCircle2 } from "lucide-react";

const JobContentCard = ({ item }) => {
  const description = get(item, "description");
  const requirementsStr = get(item, "jobrequirements");
  
  const requirements = typeof requirementsStr === "string" 
    ? requirementsStr.split("\n").filter(req => req.trim() !== "")
    : Array.isArray(requirementsStr) ? requirementsStr : [];

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all h-full">
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
          <MainText tag="h2" title="Job Description" className="text-lg font-semibold text-ui-textMain dark:text-white"/>
        </div>
        <MainText tag="span" title={description} className="text-sm text-ui-textMuted dark:text-light-gray leading-relaxed whitespace-pre-wrap"/>
      </div>

      <div className="w-full h-px bg-ui-borderLight dark:bg-ui-border mb-8" />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
          <MainText tag="h2" title="Job Requirements" className="text-lg font-semibold text-ui-textMain dark:text-white"/>
        </div>
        
        {requirements.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-ui-textMuted dark:text-light-gray">
                <span className="text-ui-muted dark:text-white/40 flex-shrink-0 mt-1">•</span>
                <MainText tag="span" title={req} className="leading-relaxed"/>
              </li>
            ))}
          </ul>
        ) : (
          <MainText tag="span" title={requirementsStr || "No specific requirements provided."} className="text-sm text-ui-textMuted dark:text-light-gray"/>
        )}
      </div>

    </div>
  );
};

export default JobContentCard;
