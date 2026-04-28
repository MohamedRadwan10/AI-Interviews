"use client";

import React from "react";
import { useDashboardComp } from "@/hooks/useDashboardComp";
import CompanyDashboardHeader from "@/Components/Header/CompanyDashboardHeader";
import CompanyDashboardStats from "@/Components/Sections/CompanyDashboardStats";
import Loading from "@/Components/Common/LoadingSkeleton";
import { useNavigation } from "@/hooks/common";
import MainTable from "@/Components/Common/Table/MainTable";
import { getCompanyDashboardColumns } from "@/Config/TableColumns/CompanyDashboardColumns";
import MainText from "@/Components/Common/MainText";
import MainSearch from "@/Components/Common/MainSearch";

const CompanyDashboard = () => {
  const { navigateTo } = useNavigation();
  const { stats, jobs, searchTerm, setSearchTerm, loading, handleDeleteJob } = useDashboardComp();

  if (loading) return <Loading type="CompanyDashboard" />;

  const onViewApplicants = (job) => navigateTo(`/intelliHire/job-applicants/${job.id}`);
  const onEditJob = (job) => navigateTo(`/intelliHire/edit-job/${job.id}`);
  const onSearchChange = (e) => setSearchTerm(e.target.value);
  const columns = getCompanyDashboardColumns(onViewApplicants, onEditJob, handleDeleteJob);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-light-primary dark:bg-dark-primary-1">
      <div className="max-w-[1200px] mx-auto">
        <CompanyDashboardHeader />
        <CompanyDashboardStats stats={stats} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-light-white dark:bg-dark-primary-3 p-6 rounded-3xl border border-ui-borderLight dark:border-ui-border">
            <MainText title="Your Posted Jobs" className="text-xl font-bold text-ui-textMain dark:text-dark-white" />
            <MainSearch value={searchTerm} onChange={onSearchChange} placeholder="Search jobs..." className="md:w-80" />
          </div>
          <MainTable data={jobs} columns={columns} emptyMessage="No jobs found." />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;