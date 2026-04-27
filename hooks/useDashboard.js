"use client";
import { useContext, useMemo, useState } from "react";
import { get, filter, includes, toLower } from "lodash-es";
import { useApi } from "./useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";

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
    
    const finalLabels = monthNames;
    const finalValues = Array(12).fill(null);

    if (chartDataRaw.length > 0) {
      chartDataRaw.forEach(item => {
        const m = get(item, "month", 1);
        if (m >= 1 && m <= 12) {
          finalValues[m - 1] = get(item, "score", 0);
        }
      });
    } else {
      finalValues.splice(0, 12, ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    const chartData = {
      labels: finalLabels,
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
    
    const strengthPoints = typeof rawStrengths === 'string' && rawStrengths 
      ? rawStrengths.split("|").map(s => s.trim()).filter(Boolean) 
      : [];
      
    const improvements = typeof rawImprovements === 'string' && rawImprovements 
      ? rawImprovements.split("|").map(s => s.trim()).filter(Boolean) 
      : [];

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

  return {
    ...dashboardData,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    refetch,
  };
};
