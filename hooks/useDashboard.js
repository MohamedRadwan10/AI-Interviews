"use client";
import { useContext, useMemo, useState, useCallback } from "react";
import { get, fill, size, forEach, chain, trim, toLower, includes, filter } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation, useMainNotify, useConfirmation, useSearch } from "@/hooks/common";
import { useUserAccount } from "@/Context/UserAccountContext";
import { CANDIDATE_DASHBOARD_COLUMNS } from "@/Config/tableConfig";

export const useDashboard = () => {
  const { userToken } = useContext(UserTokenContext);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error, refetch } = useApi({
    type: "candidateDashboard",
    autoFetch: !!userToken,
  });

  const dashboardData = useMemo(() => {
    const rawData = get(data, "data", data) || {};
    
    const totalInterviews = get(rawData, "totalInterviews", 0);
    const averageProgress = get(rawData, "averageProgress", 0);
    const latestRecord = get(rawData, "latestRecord", null);

    const chartDataRaw = get(rawData, "progressLevelChart", []);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const finalValues = fill(Array(12), 0);

    if (size(chartDataRaw) > 0) {
      forEach(chartDataRaw, (item) => {
        const m = get(item, "month", 1);
        if (m >= 1 && m <= 12) {
          finalValues[m - 1] = get(item, "score", 0);
        }
      });
    }

    const chartData = {
      labels: monthNames,
      datasets: [
        {
          label: "Progress Score",
          data: finalValues,
          spanGaps: true,
        }
      ]
    };

    const rawStrengths = get(rawData, "overallStrengthPoints", "");
    const rawImprovements = get(rawData, "overallImprovements", "");
    
    const strengthPoints = String(rawStrengths || "")
      .split("|")
      .map(s => trim(s))
      .filter(Boolean);
      
    const improvements = String(rawImprovements || "")
      .split("|")
      .map(s => trim(s))
      .filter(Boolean);

    const rawHistory = get(rawData, "interviewHistory", []);
    const interviewHistory = filter(rawHistory, (item) => {
      if (!searchTerm) return true;
      const term = toLower(searchTerm);
      return includes(toLower(get(item, "roleApplied")), term) || 
             includes(toLower(get(item, "company")), term);
    });

    return {
      totalInterviews,
      averageProgress,
      latestRecord,
      chartData,
      strengthPoints,
      improvements,
      interviewHistory,
    };
  }, [data, searchTerm]);

  return useMemo(() => ({
    ...dashboardData,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    refetch,
  }), [dashboardData, searchTerm, loading, error, refetch]);
};

export const useCandidateDashboardState = () => {
  const { navigateTo } = useNavigation();
  const { userId } = useUserAccount();
  const dashboard = useDashboard();

  const handleSearchChange = useCallback((e) => {
    dashboard.setSearchTerm(e.target.value);
  }, [dashboard]);

  const tableColumns = useMemo(() => 
    CANDIDATE_DASHBOARD_COLUMNS(navigateTo, userId)
  , [navigateTo, userId]);

  return useMemo(() => ({
    ...dashboard,
    handleSearchChange,
    tableColumns
  }), [dashboard, handleSearchChange, tableColumns]);
};

export const useDashboardComp = () => {
  const { userToken } = useContext(UserTokenContext);
  
  const { data, loading, error, refetch } = useApi({
    type: "employerDashboard",
    autoFetch: !!userToken,
  });

  const { refetch: deleteJobApi, loading: isDeleting } = useApi({
    type: "deleteJob",
    autoFetch: false,
  });

  const { success, error: notifyError } = useMainNotify();
  const { confirm } = useConfirmation();

  const handleDeleteJob = async (jobId) => {
    confirm({
      message: "Are you sure you want to delete this job? This action cannot be undone.",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await deleteJobApi({ urlSuffix: `/${jobId}` });
          success("Job Deleted", "The job has been successfully removed.");
          refetch();
        } catch (err) {
          notifyError("Delete Failed", get(err, "response.data.message") || "Could not delete the job. Please try again.");
          console.error("Failed to delete job:", err);
        }
      },
    });
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
  }, [data, rawJobs, rawData]);

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
