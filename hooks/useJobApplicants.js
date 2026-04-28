"use client";

import { useMemo } from "react";
import { get, find, maxBy } from "lodash-es";
import { useDashboardComp } from "./useDashboardComp";
import { useSearch } from "./common";
import { useApi } from "./useApi";

export const useJobApplicants = (jobId) => {
  const { jobs, loading, error, refetch } = useDashboardComp();
  const { refetch: apiUpdateStatus, loading: isUpdatingStatus } = useApi({ type: "candidateJobStatus", autoFetch: false });

  const jobDetails = useMemo(() => {
    if (!jobs || jobs.length === 0) return null;
    return find(jobs, (job) => 
      String(get(job, "id")) === String(jobId) || 
      String(get(job, "jobId")) === String(jobId)
    );
  }, [jobs, jobId]);

  const updateCandidateStatus = async (sessionId, status) => {
    try {
      await apiUpdateStatus({ urlSuffix: `/${sessionId}/status`, data: { status } });
      await refetch();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const { searchTerm, setSearchTerm, filteredData: applicants } = useSearch({
    data: get(jobDetails, "users", []),
    searchFields: ["fullName", "status"],
  });

  const stats = useMemo(() => {
    const rawApplicants = get(jobDetails, "users", []);
    const total = rawApplicants.length;
    const topScorer = maxBy(rawApplicants, "overallScore");

    return {
      total,
      topScore: get(topScorer, "overallScore", 0),
      topCandidateName: get(topScorer, "fullName", "N/A"),
    };
  }, [jobDetails]);

  return {
    jobTitle: get(jobDetails, "title", "Job Applicants"),
    applicants,
    stats,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    refetch,
    updateCandidateStatus,
    isUpdatingStatus,
  };
};
