import { getVal } from "@/Utils/Func/Common";
import MainText from "@/Components/Common/MainText";
import DownloadReport from "@/Components/Common/DownloadReport";
import { API_BASE_URL } from "@/Config/apiRegistry";
import { IMAGE_BASE_URL } from "@/Config/apiRegistry";
import CandidateInfo from "./type/Report/CandidateInfo";
import PerformanceScore from "./type/Report/PerformanceScore";
import DetailedMetrics from "./type/Report/DetailedMetrics";

const ReportHeader = ({ 
  overallScore, scoreLevel, sessionId, feedback, questionsAnswered, 
  totalQuestions, accuracyPercent, duration, averageResponseTimeSeconds, sessionDate,
  fullName, email, phoneNumber, photo, roleApplied, company
}) => {
  const scoreLevelConfig = {
    excellent: { label: "Excellent Performance", circleColor: "text-brand-primary" },
    good: { label: "Good Performance", circleColor: "text-brand-primary" },
    average: { label: "Average Performance", circleColor: "text-status-warning" },
    needsImprovement: { label: "Needs Improvement", circleColor: "text-status-error" },
  };

  const level = getVal(scoreLevelConfig, null, scoreLevel, scoreLevelConfig.average);
  const scorePercentage = Math.round(overallScore || 0);
  const accuracyRaw = Math.round(accuracyPercent || 0);
  const questionsLabel = `${questionsAnswered}/${totalQuestions}`;
  const accuracyLabel = `${accuracyRaw}%`;

  const formattedDate = sessionDate ? new Date(sessionDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : "N/A";

  const candidatePhoto = photo ? (photo.startsWith("http") ? photo : `${IMAGE_BASE_URL}${photo}`) : null;

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <MainText title="Interview Session Report" className="text-2xl font-bold text-ui-textMain dark:text-white" />
          <MainText title={`Generated on ${formattedDate}`} className="text-sm text-ui-textMuted dark:text-ui-muted mt-1" />
        </div>
        <DownloadReport
          downloadUrl={`${API_BASE_URL}/Report/${sessionId}`}
          fileName={`report-${fullName || sessionId}`}
          printElementId="report-content"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CandidateInfo 
          photo={candidatePhoto} 
          fullName={fullName} 
          email={email} 
          phoneNumber={phoneNumber} 
          roleApplied={roleApplied} 
          company={company} 
        />
        <PerformanceScore 
          scorePercentage={scorePercentage} 
          scoreLevel={scoreLevel} 
          levelLabel={level.label} 
        />
      </div>

      <DetailedMetrics 
        scorePercentage={scorePercentage}
        colorClass={level.circleColor}
        finalFeedback={feedback || "Candidate completed the interview successfully."}
        duration={duration}
        questionsLabel={questionsLabel}
        averageResponseTimeSeconds={averageResponseTimeSeconds}
        accuracyLabel={accuracyLabel}
      />
    </div>
  );
};

export default ReportHeader;
