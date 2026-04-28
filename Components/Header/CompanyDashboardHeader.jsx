"use client";

import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { Plus } from "lucide-react";
import { useNavigation } from "@/hooks/common";

const CompanyDashboardHeader = () => {
  const { navigateTo } = useNavigation();

  const btnIcon = <Plus size={18} />;
  const onPostJob = () => navigateTo("/intelliHire/post-job");

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex flex-col gap-1">
        <MainText title={"Employer Dashboard"} className="text-3xl font-bold text-ui-textMain dark:text-dark-white" />
        <MainText title={"Manage your posted jobs, track applicants, and analyze performance."} className="text-ui-textMuted dark:text-dark-gray" />
      </div>
      <MainButton title={"Post New Job"} icon={btnIcon} className="bg-brand-primary hover:bg-brand-primaryDark text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-semibold shadow-md" onClick={onPostJob} />
    </div>
  );
};

export default CompanyDashboardHeader;
