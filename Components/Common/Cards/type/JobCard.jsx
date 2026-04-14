import React from "react";
import { get, map } from "lodash-es";
import MainText from "../../MainText";
import { Briefcase, MapPin, Clock, ChevronRight, GraduationCap } from "lucide-react";
import MainButton from "../../MainButton";
import { useNavigation } from "@/hooks/common";
import { Since } from "@/Utils/Filter/date";

const JobCard = ({ job }) => {
  const { navigateTo } = useNavigation();
  const title = get(job, "title", "Unknown Title");
  const companyName = get(job, "companyName", "Unknown Company");
  const defaultLogo = companyName !== "Unknown Company" 
    ? companyName.substring(0, 2).toUpperCase() 
    : "TC";
  const logo = get(job, "companyLogo", defaultLogo) || defaultLogo;
  const type = get(job, "type", "Full Time");
  const location = get(job, "locations", "Cairo, Egypt"); 
  const category = get(job, "category", "General");
  const careerLevel = get(job, "careerLevel");
  const skillsStr = get(job, "skills", category);
  const tags = typeof skillsStr === "string" ? skillsStr.split(",").map(tag => tag.trim()) : [category]; 
  const startDateTime = get(job, "startDateTime");
  const endDateTime = get(job, "endDateTime");
  const formattedStart = Since(startDateTime);
  const formattedEnd = Since(endDateTime);
  const postedAt = formattedStart ? (formattedEnd ? `${formattedStart} - Ends: ${formattedEnd}` : formattedStart) : "Just now";
  const jobId = get(job, "jobid");

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-primary-3 text-lg font-bold text-gray-700 dark:text-gray-200 shrink-0">
          {logo}
        </div>
        <div>
          <MainText tag="h3" title={title} className="font-semibold text-lg text-gray-900 dark:text-white"/>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            <MainText tag="span" title={companyName} />
            {careerLevel && <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>}
            {careerLevel && (
              <MainText tag="span" className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> {careerLevel}
              </MainText>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <MainText className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-primary-3 text-gray-600 dark:text-gray-300">
          <Briefcase className="w-3 h-3" /> {type}
        </MainText>
        <MainText className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-primary-3 text-gray-600 dark:text-gray-300">
          <MapPin className="w-3 h-3" /> {location}
        </MainText>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {map(tags, (tag, index) => (
          <MainText key={index} title={tag} className="px-3 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"/>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <MainText className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="w-3 h-3" /> {postedAt}
        </MainText>
        <MainButton onClick={() => navigateTo(`/intelliHire/jobs/${jobId}`)} className="text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1">
          See Details <ChevronRight className="w-4 h-4" />
        </MainButton>
      </div>
    </div>
  );
};

export default JobCard;
