"use client";

import React, { useState } from "react";
import { useJobApplicants } from "@/hooks/useJobApplicants";
import JobApplicantsHeader from "../../../Header/JobApplicantsHeader";
import JobApplicantsStats from "../../../Sections/JobApplicantsStats";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import MainSearch from "@/Components/Common/MainSearch";
import MainText from "@/Components/Common/MainText";
import { JOB_APPLICANTS_COLUMNS } from "@/Config/tableConfig";
import MainTable from "@/Components/Common/Table/MainTable";
import ApplicantDetailsModal from "./ApplicantDetailsModal";

const JobApplicants = ({ id }) => {
  const jobId = id;
  const { jobTitle, applicants, stats, searchTerm, setSearchTerm, loading, updateCandidateStatus, isUpdatingStatus } = useJobApplicants(jobId);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  
  if (loading) return <RouteLoading type="JobApplicants" />;

  const onView = (applicant) => setSelectedApplicant(applicant);
  const onClose = () => setSelectedApplicant(null);
  const onSearchChange = (e) => setSearchTerm(e.target.value);

  const columns = JOB_APPLICANTS_COLUMNS(onView);
  const hasSelected = !!selectedApplicant;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-light-primary dark:bg-dark-primary-1">
      <div className="max-w-[1200px] mx-auto">
        <JobApplicantsHeader jobTitle={jobTitle} />
        
        <JobApplicantsStats stats={stats} />
        
        <div className="bg-white dark:bg-dark-primary-4 p-6 rounded-3xl border border-ui-borderLight dark:border-ui-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <MainText title="Applied Candidates" className="text-xl font-bold dark:text-white" />
            <MainSearch value={searchTerm} onChange={onSearchChange} placeholder="Search candidates..." className="md:w-80" />
          </div>
          <MainTable data={applicants} columns={columns} emptyMessage="No applicants found." />
          <ApplicantDetailsModal 
            visible={hasSelected} 
            applicant={selectedApplicant} 
            onHide={onClose} 
            updateStatus={updateCandidateStatus}
            isUpdating={isUpdatingStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;
