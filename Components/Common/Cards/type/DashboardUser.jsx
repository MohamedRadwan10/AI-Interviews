import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { Video, TrendingUp, Eye } from "lucide-react";
import { useNavigation } from "@/hooks/common";
import { useUserAccount } from "@/Context/UserAccountContext";

export const DashboardCards = ({ totalInterviews, averageProgress, latestRecord }) => {
  const { navigateTo } = useNavigation();
  const { userId } = useUserAccount();

  const latestJobTitle = latestRecord?.jobTitle || "No recent interviews";
  const latestCompany = latestRecord?.companyName || "-";
  const latestScore = latestRecord?.overallScore || "-";
  const onViewReport = () => navigateTo(`/intelliHire/report/${latestRecord?.sessionId}/${userId}`);
  const viewIcon = <Eye className="w-4 h-4" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4">
          <Video className="w-6 h-6 text-brand-primary" />
        </div>
        <MainText className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-1">{totalInterviews}</MainText>
        <MainText className="text-sm font-medium text-ui-textMuted dark:text-ui-muted">{"Total Interviews"}</MainText>
      </div>

      <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
        </div>
        <MainText className="text-3xl font-extrabold text-ui-textMain dark:text-white mb-1">{averageProgress}</MainText>
        <MainText className="text-sm font-medium text-ui-textMuted dark:text-ui-muted">{"Avg. Progress Score"}</MainText>
      </div>

      <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm flex items-center justify-between">
        <div className="flex flex-col">
          <MainText className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">{"Latest Interview"}</MainText>
          <MainText className="text-sm font-semibold text-ui-textMain dark:text-white mb-1 line-clamp-1">{latestJobTitle}</MainText>
          <MainText className="text-xs text-ui-textMuted dark:text-ui-muted mb-4">{latestCompany}</MainText>
          {latestRecord?.sessionId && (
            <MainButton className="bg-brand-primary hover:bg-brand-primaryDark text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 w-fit" onClick={onViewReport} icon={viewIcon} title="View Report" />
          )}
        </div>
        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0">
          <MainText className="text-xl font-bold text-slate-700 dark:text-slate-300">{latestScore}</MainText>
          <MainText className="text-[10px] text-slate-500 uppercase">Score</MainText>
        </div>
      </div>
    </div>
  );
};
