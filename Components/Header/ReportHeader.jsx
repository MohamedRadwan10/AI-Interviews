import { getVal } from "@/Utils/Func/Common";
import MainText from "@/Components/Common/MainText";
import DownloadReport from "@/Components/Common/DownloadReport";
import CircularProgress from "@/Components/Common/Progress/CircularProgress";
import { API_BASE_URL } from "@/Config/apiRegistry";

const ReportHeader = ({ 
  overallScore, scoreLevel, sessionId, feedback, questionsAnswered, 
  totalQuestions, accuracyPercent, duration, averageResponseTimeSeconds, sessionDate, overallRating
}) => {
  const scoreLevelConfig = {
    excellent: { label: "Excellent Performance", color: "text-brand-primary", circleColor: "text-brand-primary" },
    good: { label: "Good Performance", color: "text-brand-primary", circleColor: "text-brand-primary" },
    average: { label: "Average Performance", color: "text-status-warning", circleColor: "text-status-warning" },
    needsImprovement: { label: "Needs Improvement", color: "text-status-error", circleColor: "text-status-error" },
  };

  const level = getVal(scoreLevelConfig, null, scoreLevel, scoreLevelConfig.average);
  const scorePercentage = Math.round(accuracyPercent || 0);
  
  const finalFeedback = feedback || "Candidate completed the interview successfully.";
  const questionsLabel = `${questionsAnswered}/${totalQuestions}`;
  const accuracyLabel = `${scorePercentage}%`;

  const formattedDate = sessionDate ? new Date(sessionDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : "N/A";

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <MainText title="Interview Session Report" className="text-xl font-bold text-ui-textMain dark:text-white" />
          <MainText title={`Date: ${formattedDate}`} className="text-sm text-ui-textMuted dark:text-ui-muted" />
        </div>
        <DownloadReport
          downloadUrl={`${API_BASE_URL}/Report/${sessionId}`}
          fileName={`report-${sessionId}`}
          printElementId="report-content"
        />
      </div>

      <div className="bg-white dark:bg-[#1a1d24] rounded-[20px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center gap-6 flex-1">
          <CircularProgress percentage={scorePercentage} colorClass={level.circleColor} />
          <div className="flex-1 max-w-lg">
            <MainText tag="h2" title={level.label} className="text-lg font-semibold text-ui-textMain dark:text-white mb-2" />
            <MainText tag="p" title={finalFeedback} className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed line-clamp-3" />
          </div>
        </div>

        <div className="flex items-center gap-8 shrink-0 w-full md:w-auto">
          <div className="hidden md:block w-px h-16 bg-ui-borderLight dark:bg-ui-border" />
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 w-full md:w-auto">
            <div>
              <MainText title={"Duration"} className="text-xs text-ui-textMuted dark:text-ui-muted mb-1" />
              <MainText title={duration || "N/A"} className="text-sm font-semibold text-ui-textMain dark:text-white" />
            </div>
            <div>
              <MainText title={"Questions"} className="text-xs text-ui-textMuted dark:text-ui-muted mb-1" />
              <MainText title={questionsLabel} className="text-sm font-semibold text-ui-textMain dark:text-white" />
            </div>
            <div>
              <MainText title={"Avg. Response Time"} className="text-xs text-ui-textMuted dark:text-ui-muted mb-1" />
              <MainText className="text-sm font-semibold text-ui-textMain dark:text-white" title={averageResponseTimeSeconds || "N/A"} />
            </div>
            <div>
              <MainText title={"Accuracy"} className="text-xs text-ui-textMuted dark:text-ui-muted mb-1" />
              <MainText title={accuracyLabel} className="text-sm font-semibold text-status-success" />
            </div>
            <div>
              <MainText title={"Overall Rating"} className="text-xs text-ui-textMuted dark:text-ui-muted mb-1" />
              <MainText title={`${overallRating || 0}/100`} className="text-sm font-semibold text-ui-textMain dark:text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
