import React from "react";
import { get, map } from "lodash-es";
import MainText from "../../MainText";
import { Briefcase } from "lucide-react";

const JobSpecsCard = ({ item }) => {
  const careerLevel = get(item, "careerLevel", "Not specified");
  const experience = get(item, "experience", "0 to 1 Years");
  const category = get(item, "category", "General");
  const skillsStr = get(item, "skills", category);
  
  const tags = typeof skillsStr === "string" ? skillsStr.split(",").map(tag => tag.trim()) : [category];

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-gray-200 dark:border-gray-800 shadow-sm transition-all h-full mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-500" />
        <MainText tag="h2" title="Job Details" className="text-lg font-semibold text-gray-900 dark:text-white"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <MainText tag="span" title="Experience Needed" className="text-xs text-gray-500 dark:text-gray-400 block mb-1"/>
          <MainText tag="span" title={experience} className="text-sm font-medium text-gray-900 dark:text-white"/>
        </div>
        <div>
          <MainText tag="span" title="Career Level" className="text-xs text-gray-500 dark:text-gray-400 block mb-1"/>
          <MainText tag="span" title={careerLevel} className="text-sm font-medium text-gray-900 dark:text-white capitalize"/>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <MainText tag="span" title="Job Categories" className="text-xs text-gray-500 dark:text-gray-400 block mb-1"/>
        <MainText tag="span" title={category} className="text-sm font-medium text-gray-900 dark:text-white"/>
      </div>

      <div>
        <MainText tag="span" title="Skills And Tools" className="text-xs text-gray-500 dark:text-gray-400 block mb-3"/>
        <div className="flex flex-wrap gap-2">
          {map(tags, (tag, index) => (
            <MainText 
              key={index} 
              title={tag} 
              className="px-3 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-primary-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSpecsCard;
