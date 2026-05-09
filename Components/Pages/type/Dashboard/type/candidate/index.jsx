"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import ProgressChart from "@/Components/Common/Chart";
import MainTable from "@/Components/Common/Table/MainTable";
import { Clock } from "lucide-react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { DashboardCards } from "@/Components/Common/Cards/type/DashboardUser";
import { DashboardAnalysis } from "@/Components/Sections/DashboardAnalysis";
import { useCandidateDashboardState } from "@/hooks/useDashboard";
import MainSearch from "@/Components/Common/MainSearch";

export const DashboardPage = () => {
  const {
    totalInterviews, averageProgress, latestRecord,
    chartData, strengthPoints, improvements, interviewHistory,
    searchTerm, handleSearchChange, loading, tableColumns
  } = useCandidateDashboardState();

  if (loading) return <RouteLoading type="CandidateDashboard" />;

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <DashboardCards
          totalInterviews={totalInterviews} 
          averageProgress={averageProgress} 
          latestRecord={latestRecord} 
        />

        <ProgressChart data={chartData} />

        <DashboardAnalysis 
          strengthPoints={strengthPoints} 
          improvements={improvements} 
        />

        <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-primary" />
              <MainText tag="h3" title={"Interview History"} className="text-lg font-bold text-ui-textMain dark:text-white" />
            </div>
            <MainSearch value={searchTerm} onChange={handleSearchChange} placeholder="Search interviews..." className="md:w-80" />
          </div>

          <MainTable data={interviewHistory} columns={tableColumns} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
