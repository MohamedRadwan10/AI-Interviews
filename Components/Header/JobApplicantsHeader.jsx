"use client";

import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { ArrowLeft } from "lucide-react";
import { useNavigation } from "@/hooks/common";

const JobApplicantsHeader = ({ jobTitle }) => {
  const { navigateBack } = useNavigation();
  const backIcon = <ArrowLeft size={18} />;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <MainButton onClick={navigateBack} className="flex items-center gap-2 text-ui-textMuted hover:text-brand-primary transition-colors w-fit" icon={backIcon} title={"Back to Dashboard"} />
      <div className="flex flex-col gap-1">
        <MainText title={jobTitle} className="text-3xl font-bold text-ui-textMain dark:text-dark-white" />
        <MainText title={"Review and manage candidates who applied for this position."} className="text-ui-textMuted dark:text-dark-gray" />
      </div>
    </div>
  );
};

export default JobApplicantsHeader;
