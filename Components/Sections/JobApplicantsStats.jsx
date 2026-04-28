"use client";

import React from "react";
import MainCard from "@/Components/Common/Cards";
import { Users, Target } from "lucide-react";

const JobApplicantsStats = ({ stats }) => {
  const { total, topScore } = stats;
  
  const scoreValue = topScore ? `${topScore.toFixed(1)} / 10` : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <MainCard type="stat" title={"Total Applicants"} value={total} icon={Users} />
      <MainCard type="stat" title={"Top Score"} value={scoreValue} icon={Target} className="!text-status-success" />
    </div>
  );
};

export default JobApplicantsStats;
