"use client";

import React from "react";
import MainCard from "@/Components/Common/Cards";
import { Briefcase, Users} from "lucide-react";
import { map } from "lodash-es";

const CompanyDashboardStats = ({ stats }) => {
  const { activeJobs, totalApplicants} = stats;

  const statsList = [
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: Briefcase,
    },
    {
      title: "Total Applicants",
      value: totalApplicants,
      icon: Users,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
      {map(statsList, (stat, index) => (
        <MainCard
          key={index}
          type="stat"
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          className={stat.className}
        />
      ))}
    </div>
  );
};

export default CompanyDashboardStats;
