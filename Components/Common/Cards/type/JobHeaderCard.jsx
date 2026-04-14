import React from "react";
import { get } from "lodash-es";
import MainText from "../../MainText";
import MainButton from "../../MainButton";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Since } from "@/Utils/Filter/date";

const JobHeaderCard = ({ item }) => {
  const title = get(item, "title");
  const companyName = get(item, "companyName");
  const defaultLogo = companyName !== "Unknown Company" ? companyName?.substring(0, 2).toUpperCase() : "TC";
  const logo = get(item, "companyLogo", defaultLogo) || defaultLogo;
  const type = get(item, "type");
  const location = get(item, "locations");
  const applyUrl = get(item, "applyUrl");
  const description = get(item, "description");
  const startDateTime = get(item, "startDateTime");
  const endDateTime = get(item, "endDateTime");
  const formattedStart = Since(startDateTime);
  const formattedEnd = Since(endDateTime);
  const postedAt = formattedStart ? (formattedEnd ? `${formattedStart} - Ends: ${formattedEnd}` : formattedStart) : "Just now";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-gray-200 dark:border-gray-800 shadow-sm transition-all h-full mb-6 gap-6">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-primary-3 text-2xl font-bold text-gray-700 dark:text-gray-200 shrink-0">
            {logo}
          </div>
          <div>
            <MainText tag="h1" title={title} className="font-semibold text-2xl text-gray-900 dark:text-white" />
            <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1">
              <MainText tag="span" title={companyName} />
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>
              <MainText tag="span" className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {location}
              </MainText>
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>
              <MainText tag="span" className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {type}
              </MainText>
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>
              <MainText tag="span" className="flex items-center gap-1">
                {postedAt}
              </MainText>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 text-sm">
          <MainText tag="h4" className="font-medium text-gray-900 dark:text-gray-100">
            About {companyName}
          </MainText>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" /> {location}
          </div>
          {applyUrl !== "#" && (
            <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm w-fit mt-1">
              <ExternalLink className="w-4 h-4" /> {applyUrl}
            </a>
          )}
          {description && (
             <MainText className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl leading-relaxed text-sm">
               {description}
             </MainText>
          )}
        </div>
      </div>
      
      <div className="shrink-0 w-full md:w-auto mt-4 md:mt-auto flex justify-end">
        <MainButton 
          className="w-full flex justify-center items-center md:w-48 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors border-0"
        >
          Apply Now
        </MainButton>
      </div>
    </div>
  );
};

export default JobHeaderCard;
