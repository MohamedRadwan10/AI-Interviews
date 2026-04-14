import React from "react";
import { get } from "lodash-es";
import MainText from "../../MainText";
import { FileText, CheckCircle2 } from "lucide-react";

const JobContentCard = ({ item }) => {
  const description = get(item, "description");
  const requirementsStr = get(item, "jobrequirements");
  
  const requirements = typeof requirementsStr === "string" 
    ? requirementsStr.split("\n").filter(req => req.trim() !== "")
    : Array.isArray(requirementsStr) ? requirementsStr : [];

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-gray-200 dark:border-gray-800 shadow-sm transition-all h-full">
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-500" />
          <MainText tag="h2" title="Job Description" className="text-lg font-semibold text-gray-900 dark:text-white"/>
        </div>
        <MainText tag="span" title={description} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"/>
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-8" />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-500" />
          <MainText tag="h2" title="Job Requirements" className="text-lg font-semibold text-gray-900 dark:text-white"/>
        </div>
        
        {requirements.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1">•</span>
                <MainText tag="span" title={req} className="leading-relaxed"/>
              </li>
            ))}
          </ul>
        ) : (
          <MainText tag="span" title={requirementsStr || "No specific requirements provided."} className="text-sm text-gray-600 dark:text-gray-300"/>
        )}
      </div>

    </div>
  );
};

export default JobContentCard;
