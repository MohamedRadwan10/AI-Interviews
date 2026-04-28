import React, { useEffect } from "react";
import { CheckCircle2, FileText, LayoutDashboard, Loader2 } from "lucide-react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { useNavigation } from "@/hooks/common";
import { useUserAccount } from "@/Context/UserAccountContext";

export const InterviewComplete = ({ message, sessionId}) => {
  const { navigateTo, replaceUrl } = useNavigation();
  const {id} = useUserAccount();
  const msgText = message || "Your responses have been successfully submitted and your session is now closed. Your report is being generated and will be available shortly.";
  const onViewReport = () => navigateTo(`/intelliHire/report/${sessionId}`);
  const onGoDashboard = () => navigateTo("/intelliHire");
  const reportIcon = <FileText className="w-5 h-5" />;
  const dashboardIcon = <LayoutDashboard className="w-5 h-5" />;

  useEffect(() => {
    if (sessionId) {
      const timer = setTimeout(() => {
        replaceUrl(`/intelliHire/report/${sessionId}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sessionId, replaceUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-status-success/10 rounded-full flex items-center justify-center mb-2">
        <CheckCircle2 className="w-12 h-12 text-status-success" />
      </div>
      <MainText tag="h2" className="text-3xl font-bold text-ui-textMain dark:text-white">
        Interview Complete!
      </MainText>
      <MainText className="text-ui-textMuted dark:text-ui-muted max-w-lg">{msgText}</MainText>
      
      {sessionId && (
        <div className="flex items-center gap-2 mt-2 text-brand-primary font-medium">
          <Loader2 className="w-5 h-5 animate-spin" />
          <MainText>Redirecting to your report...</MainText>
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        {sessionId && (
          <MainButton onClick={onViewReport} className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 text-lg rounded-xl font-semibold hover:bg-brand-primaryDark transition-colors shadow-md hover:shadow-lg" icon={reportIcon} title="View Report" />
        )}
        <MainButton onClick={onGoDashboard} className="flex items-center gap-2 bg-white dark:bg-dark-primary-3 text-ui-textMain dark:text-white border border-ui-borderLight dark:border-ui-border px-8 py-3 text-lg rounded-xl font-semibold hover:bg-light-main dark:hover:bg-dark-primary-4 transition-colors" icon={dashboardIcon} title="Dashboard" />
      </div>
    </div>
  );
};
