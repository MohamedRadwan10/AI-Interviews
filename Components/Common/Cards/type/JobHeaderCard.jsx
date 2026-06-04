"use client";
import React, { useState, useEffect, useMemo } from "react";
import { get } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Since } from "@/Utils/Filter/date";
import { useNavigation } from "@/hooks/common";
import MainImage from "@/Components/Common/Image";
import { getImageUrl } from "@/Utils/Func/UrlHelper";
import { useUserAccount } from "@/Context/UserAccountContext";
import { formatDate } from "@/Utils/Func/Common";
import { useCheckJobMatch } from "@/hooks/useJobs";
import JobRejectionModal from "@/Components/Modal/JobRejectionModal";

const JobHeaderCard = ({ item }) => {
  const { accountData } = useUserAccount();
  const userType = get(accountData, "userType");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { navigateTo } = useNavigation();
  const id = get(item, "id") || get(item, "_id");
  const title = get(item, "title");
  const companyName = get(item, "companyName", "Unknown Company");
  const rawLogo = get(item, "companyLogo");
  const logoUrl = getImageUrl(rawLogo);
  const defaultLogoText = companyName !== "Unknown Company" ? companyName?.substring(0, 2).toUpperCase() : "TC";
  const type = get(item, "type", "Full Time");
  const rawLocation = get(item, "locations") || get(item, "location");
  const city = get(item, "city");
  const country = get(item, "country");
  const location = rawLocation || (city && country && city !== "N/A" ? `${city}, ${country}` : "Cairo, Egypt");
  const applyUrl = get(item, "companyUrl", "#");
  const description = get(item, "description");
  const startDateTime = get(item, "startDateTime") || get(item, "startedAt");
  const endDateTime = get(item, "endDateTime");
  const formattedStart = Since(startDateTime);
  const formattedEnd = formatDate(endDateTime);
  const postedAt = formattedStart ? (formattedEnd ? `${formattedStart} - Ends: ${formattedEnd}` : formattedStart) : "Just now";

  const { checkAndApply, isLoading, matchResult, showRejectionModal, setShowRejectionModal } = useCheckJobMatch();
  const onApply = () => checkAndApply(id);

  const logoContent = useMemo(() => {
    if (logoUrl) {
      return <MainImage src={logoUrl} alt={companyName} width={64} height={64} imageClassName="object-cover w-full h-full" />;
    }
    return <span className="text-2xl font-bold text-ui-textMuted dark:text-gray-200">{defaultLogoText}</span>;
  }, [logoUrl, companyName, defaultLogoText]);

  const companyUrlContent = useMemo(() => {
    if (applyUrl === "#") return null;
    return (
      <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-primary hover:text-brand-primaryDark text-sm w-fit mt-1">
        <ExternalLink className="w-4 h-4" /> {applyUrl}
      </a>
    );
  }, [applyUrl]);

  const descriptionContent = useMemo(() => {
    if (!description) return null;
    return <MainText className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl leading-relaxed text-sm">{description}</MainText>;
  }, [description]);

  const applyButton = useMemo(() => {
    if (!isMounted || userType !== "Individual") return null;
    return (
      <div className="shrink-0 w-full md:w-auto mt-4 md:mt-auto flex justify-end">
        <MainButton 
          onClick={onApply} 
          isLoading={isLoading}
          className="w-full flex justify-center items-center md:w-48 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white font-medium transition-colors border-0" 
          title={"Apply Now"} 
        />
      </div>
    );
  }, [isMounted, userType, onApply]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all h-full mb-6 gap-6">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl border border-ui-borderLight dark:border-ui-border bg-light-primary dark:bg-dark-primary-3 overflow-hidden shrink-0">
            {logoContent}
          </div>
          <div>
            <MainText tag="h1" title={title} className="font-semibold text-2xl text-ui-textMain dark:text-white" />
            <div className="flex flex-wrap items-center gap-2 text-ui-textMuted dark:text-ui-muted text-sm mt-1">
              <MainText tag="span" title={companyName} />
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>
              <MainText tag="span" className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {location}</MainText>
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>
              <MainText tag="span" className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {type}</MainText>
              <span className="text-gray-300 dark:text-gray-600 text-[10px]">●</span>
              <MainText tag="span" className="flex items-center gap-1">{postedAt}</MainText>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 text-sm">
          <MainText tag="h4" className="font-medium text-ui-textMain dark:text-gray-100">About {companyName}</MainText>
          <div className="flex items-center gap-1 text-ui-textMuted dark:text-ui-muted"><MapPin className="w-4 h-4" /> {location}</div>
          {companyUrlContent}
          {descriptionContent}
        </div>
      </div>

      {applyButton}
      <JobRejectionModal 
        visible={showRejectionModal} 
        onHide={() => setShowRejectionModal(false)} 
        result={matchResult} 
      />
    </div>
  );
};

export default JobHeaderCard;
