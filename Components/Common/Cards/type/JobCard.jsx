import React, { Suspense } from "react";
import { get, map } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import { Briefcase, MapPin, Clock, ChevronRight, GraduationCap } from "lucide-react";
import MainButton from "@/Components/Common/MainButton";
import { useNavigation } from "@/hooks/common";
import { Since } from "@/Utils/Filter/date";
import MainImage from "@/Components/Common/Image";
import { getImageUrl } from "@/Utils/Func/UrlHelper";

const JobCardContent = ({ job }) => {
  const { navigateTo } = useNavigation();
  const title = get(job, "title", "Unknown Title");
  const companyName = get(job, "companyName") || "Unknown Company";
  const rawLogo = get(job, "companyLogo");
  const logoUrl = getImageUrl(rawLogo);
  
  const defaultLogoText = (typeof companyName === "string" && companyName !== "Unknown Company" && companyName.length > 0)
    ? companyName.substring(0, 2).toUpperCase() 
    : "TC";
  const type = get(job, "type", "Full Time");
  const rawLocation = get(job, "locations");
  const city = get(job, "city");
  const country = get(job, "country");
  const location = rawLocation || (city && country && city !== "N/A" ? `${city}, ${country}` : "Cairo, Egypt"); 
  const category = get(job, "category", "General");
  const careerLevel = get(job, "careerLevel");
  const skillsStr = get(job, "skillsAndTools", category);
  const tags = typeof skillsStr === "string" ? skillsStr.split(",").map(tag => tag.trim()) : [category]; 
  const startDateTime = get(job, "startDateTime") || get(job, "startedAt");
  const endDateTime = get(job, "endDateTime");
  const formattedStart = Since(startDateTime);
  const formattedEnd = Since(endDateTime);
  const postedAt = formattedStart ? (formattedEnd ? `${formattedStart} - Ends: ${formattedEnd}` : formattedStart) : "Just now";
  const jobId = get(job, "id");

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all hover:shadow-md h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-ui-borderLight dark:border-ui-border bg-light-primary dark:bg-dark-primary-3 overflow-hidden shrink-0">
          {logoUrl ? (
            <MainImage 
              src={logoUrl} 
              alt={companyName}
              width={48}
              height={48}
              imageClassName="object-cover w-full h-full"
            />
          ) : (
            <span className="text-lg font-bold text-ui-textMuted dark:text-white">
              {defaultLogoText}
            </span>
          )}
        </div>
        <div>
          <MainText tag="h3" title={title} className="font-semibold text-lg text-ui-textMain dark:text-white"/>
          <div className="flex items-center gap-2 text-ui-textMuted dark:text-ui-muted text-sm mt-0.5">
            <MainText tag="span" title={companyName} />
            {careerLevel && <span className="text-ui-borderLight dark:text-ui-textMuted text-[10px]">●</span>}
            {careerLevel && (
              <MainText tag="span" className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> {careerLevel}
              </MainText>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <MainText className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-light-main dark:bg-dark-primary-3 text-ui-textMuted dark:text-ui-muted">
          <Briefcase className="w-3 h-3" /> {type}
        </MainText>
        <MainText className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-light-main dark:bg-dark-primary-3 text-ui-textMuted dark:text-ui-muted">
          <MapPin className="w-3 h-3" /> {location}
        </MainText>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {map(tags, (tag, index) => (
          <MainText key={index} title={tag} className="px-3 py-1 rounded-full text-xs border border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted"/>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-ui-borderLight dark:border-ui-border mt-auto">
        <MainText className="flex items-center gap-1.5 text-xs text-ui-muted">
          <Clock className="w-3 h-3" /> {postedAt}
        </MainText>
        <MainButton onClick={() => navigateTo(`/intelliHire/jobs/${jobId}`)} className="text-sm font-semibold text-brand-primary dark:text-brand-accent hover:text-brand-primaryDark dark:hover:text-brand-accent/80 flex items-center gap-1">
          See Details <ChevronRight className="w-4 h-4" />
        </MainButton>
      </div>
    </div>
  );
};

const JobCard = (props) => {
  return (
    <Suspense fallback={null}>
      <JobCardContent {...props} />
    </Suspense>
  );
};

export default JobCard;
