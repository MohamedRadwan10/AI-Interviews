"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import MainInput from "@/Components/Common/Inputs";
import ProgressChart from "@/Components/Common/Chart";
import MainTable from "@/Components/Common/Table/MainTable";
import { useDashboard } from "@/hooks/useDashboard";
import { Search, Clock } from "lucide-react";
import { useNavigation } from "@/hooks/common";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { DashboardCards } from "@/Components/Common/Cards/type/DashboardUser";
import { DashboardAnalysis } from "@/Components/Sections/DashboardAnalysis";
import { useUserAccount } from "@/Context/UserAccountContext";

export const DashboardPage = () => {
  const { navigateTo } = useNavigation();
  const { userId } = useUserAccount();
  const {
    totalInterviews, averageProgress, latestRecord,
    chartData, strengthPoints, improvements, interviewHistory,
    searchTerm, setSearchTerm, loading
  } = useDashboard();

  if (loading) return <RouteLoading type="CandidateDashboard" />;

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const tableColumns = [
    { field: "roleApplied", header: "Role Applied" },
    { field: "company", header: "Company" },
    { field: "date", header: "Date", body: (r) => r.date ? new Date(r.date).toLocaleDateString() : "-", type: "custom" },
    { field: "overallScore", header: "Overall Score", body: (r) => `${r.overallScore}`, type: "custom" },
    { 
      field: "hasReport", 
      header: "Status", 
      type: "custom", 
      body: (r) => {
        const statusText = r.hasReport ? "Completed" : "Pending";
        const statusClass = `px-2 py-1 rounded-full text-xs font-bold ${r.hasReport ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'}`;
        return (
          <span className={statusClass}>
            {statusText}
          </span>
        );
      }
    },
    { 
      field: "action", 
      header: "Report", 
      type: "button", 
      onClick: (row) => navigateTo(`/intelliHire/report/${row.sessionId}/${userId}`)
    }
  ];

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
            <div className="w-full md:w-64">
              <MainInput
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                icon={<Search className="w-4 h-4 text-ui-textMuted" />}
                className="w-full rounded-2xl bg-slate-50 dark:bg-dark-primary-3"
              />
            </div>
          </div>

          <MainTable data={interviewHistory} columns={tableColumns} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
