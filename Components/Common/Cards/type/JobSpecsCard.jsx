import React from "react";
import { get, map } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import { Briefcase } from "lucide-react";

const JobSpecsCard = ({ item }) => {
  const careerLevel = get(item, "careerLevel", "Not specified");
  const experience = get(item, "experienceYears", "0 to 1 Years");
  const category = get(item, "category", "General");
  const skillsStr = get(item, "skills", category);
  
  const tags = typeof skillsStr === "string" ? skillsStr.split(",").map(tag => tag.trim()) : [category];

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all h-full mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
        <MainText tag="h2" title="Job Details" className="text-lg font-semibold text-ui-textMain dark:text-white"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <MainText tag="span" title="Experience Needed" className="text-xs text-ui-textMuted dark:text-ui-muted block mb-1"/>
          <MainText tag="span" title={experience} className="text-sm font-medium text-ui-textMain dark:text-white"/>
        </div>
        <div>
          <MainText tag="span" title="Career Level" className="text-xs text-ui-textMuted dark:text-ui-muted block mb-1"/>
          <MainText tag="span" title={careerLevel} className="text-sm font-medium text-ui-textMain dark:text-white capitalize"/>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-ui-borderLight dark:border-ui-border">
        <MainText tag="span" title="Job Categories" className="text-xs text-ui-textMuted dark:text-ui-muted block mb-1"/>
        <MainText tag="span" title={category} className="text-sm font-medium text-gray-900 dark:text-white"/>
      </div>

      <div>
        <MainText tag="span" title="Skills And Tools" className="text-xs text-ui-textMuted dark:text-ui-muted block mb-3"/>
        <div className="flex flex-wrap gap-2">
          {map(tags, (tag, index) => (
            <MainText 
              key={index} 
              title={tag} 
              className="px-3 py-1 rounded-full text-xs border border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted bg-light-primary dark:bg-dark-primary-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSpecsCard;
