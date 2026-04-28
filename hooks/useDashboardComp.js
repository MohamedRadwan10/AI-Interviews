"use client";

import { useContext, useMemo, useState } from "react";
import { get } from "lodash-es";
import { useApi } from "./useApi";
import { useSearch } from "./common";
import { UserTokenContext } from "@/Context/UserTokenContext";


export const useDashboardComp = () => {
  const { userToken } = useContext(UserTokenContext);
  
  const { 
    data, 
    loading, 
    error, 
    refetch 
  } = useApi({
    type: "employerDashboard",
    autoFetch: !!userToken,
  });

  const { refetch: deleteJobApi, loading: isDeleting } = useApi({
    type: "deleteJob",
    autoFetch: false,
  });

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJobApi({ urlSuffix: `/${jobId}` });
      refetch();
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const rawData = get(data, "data", data) || {};
  const rawJobs = get(rawData, "jobs", Array.isArray(rawData) ? rawData : get(rawData, "items", []));

  const { searchTerm, setSearchTerm, filteredData: jobs } = useSearch({
    data: rawJobs,
    searchFields: ["title", "location", "type"],
  });

  const dashboardData = useMemo(() => {
    const stats = {
      activeJobs: get(rawData, "activeJobs", 0),
      totalApplicants: get(rawData, "totalApplicants", 0),
      topCandidate: {
        name: get(rawData, "topCandidateName", "N/A"),
        score: get(rawData, "topCandidateScore", 0),
      }
    };

    return {
      stats,
      originalJobsCount: rawJobs.length
    };
  }, [data, rawJobs]);

  return {
    ...dashboardData,
    jobs,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    refetch,
    handleDeleteJob,
    isDeleting,
  };
};
