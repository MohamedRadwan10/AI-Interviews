"use client";
import { useMemo, useContext } from "react";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { formatDate } from "@/Utils/date/dateFormat";
import { get, isArray, size, map } from "lodash-es";
import { APP_CONFIG } from "@/Config/appConfig";

export const useReport = (sessionId, userId) => {
  const { userToken } = useContext(UserTokenContext);

  const { data, loading, error, refetch } = useApi({
    type: "report",
    urlSuffix: `/${sessionId}/${userId}`,
    autoFetch: !!sessionId && !!userToken && !!userId,
  });  

  return useMemo(() => {
    const report = get(data, "report", data) || {};
    const questionsArray = isArray(report.questions) ? report.questions : [];

    const overallScore = get(report, "overallScore", 0);
    const jobTitle = get(report, "roleApplied", "Interview Report");
    const company = get(report, "company", "");
    const sessionDate = get(report, "createdAt", null);
    const duration = get(report, "duration", "");
    const averageResponseTimeSeconds = get(report, "averageResponseTimeSeconds", "");
    const overallRating = get(report, "overallRating", 0);
    const totalQuestions = get(report, "totalQuestionsCount", size(questionsArray));
    const questionsAnswered = get(report, "questionsAnsweredCount", 0);
    const accuracyPercent = get(report, "accuracyPercent", 0);
    const accuracyLabel = get(report, "accuracyLabel", "");

    const feedback = get(report, "performanceSummary", "");
    const strengthPoints = get(report, "strengthPoints", "");
    const weaknessesPoints = get(report, "weaknessesPoints", "");
    const improvementsTips = get(report, "improvementsTips", "");
    const skillAnalysis = get(report, "skillAnalysis", []);

    const recommendationReason = get(report, "recommendationReason", "");
    const redFlags = get(report, "redFlags", "");
    const performanceLabel = get(report, "performanceLabel", "");
    const hiringRecommendation = get(report, "hiringRecommendation", "");

    const scoreBreakdown = map(questionsArray, (q, index) => ({
      index: index + 1,
      question: get(q, "questionText", ""),
      answer: get(q, "userAnswer", "No User Answer"),
      idealAnswer: get(q, "idealAnswer", ""),
      responseTime: get(q, "responseTime", ""),
      type: get(q, "type", ""),
      difficulty: get(q, "difficulty", ""),
    }));

    const fullName = get(report, "fullName", "");
    const email = get(report, "email", "");
    const phoneNumber = get(report, "phoneNumber", "");
    const photo = get(report, "photo", "");
    const role = get(report, "role", "");

    const scoreLevel =
      accuracyPercent >= 80 ? "excellent" :
      accuracyPercent >= 60 ? "good" :
      accuracyPercent >= 40 ? "average" : "needsImprovement";

    return {
      report,
      jobTitle,
      company,
      sessionDate,
      overallScore,
      totalQuestions,
      questionsAnswered,
      accuracyPercent,
      accuracyLabel,
      averageResponseTimeSeconds,
      duration,
      overallRating,
      feedback,
      strengthPoints,
      weaknessesPoints,
      improvementsTips,
      skillAnalysis,
      scoreBreakdown,
      scoreLevel,
      recommendationReason,
      redFlags,
      performanceLabel,
      hiringRecommendation,
      fullName,
      email,
      phoneNumber,
      photo,
      role,
      isLoading: loading,
      error,
      refetch,
      sessionId,
    };
  }, [data, loading, error, refetch, sessionId]);
};

export const useReportHeader = (props) => {
  const { 
    overallScore, scoreLevel, accuracyPercent, questionsAnswered, 
    totalQuestions, sessionDate, photo, fullName, sessionId 
  } = props;

  const scoreLevelConfig = useMemo(() => ({
    excellent: { label: "Excellent Performance", circleColor: "text-brand-primary" },
    good: { label: "Good Performance", circleColor: "text-brand-primary" },
    average: { label: "Average Performance", circleColor: "text-status-warning" },
    needsImprovement: { label: "Needs Improvement", circleColor: "text-status-error" },
  }), []);

  const level = useMemo(() => 
    get(scoreLevelConfig, scoreLevel, scoreLevelConfig.average)
  , [scoreLevel, scoreLevelConfig]);

  const scorePercentage = useMemo(() => Math.round(overallScore || 0), [overallScore]);
  const accuracyRaw = useMemo(() => Math.round(accuracyPercent || 0), [accuracyPercent]);
  const questionsLabel = useMemo(() => `${questionsAnswered}/${totalQuestions}`, [questionsAnswered, totalQuestions]);
  const accuracyLabel = useMemo(() => `${accuracyRaw}%`, [accuracyRaw]);

  const formattedDate = useMemo(() => 
    sessionDate ? formatDate(sessionDate) : "N/A"
  , [sessionDate]);

  const IMAGE_BASE_URL = "https://intellhire.runasp.net"; 
  const candidatePhoto = useMemo(() => 
    photo ? (photo.startsWith("http") ? photo : `${IMAGE_BASE_URL}${photo}`) : null
  , [photo]);

  const downloadFileName = useMemo(() => `report-${fullName || sessionId}`, [fullName, sessionId]);

  return useMemo(() => ({
    level,
    scorePercentage,
    accuracyRaw,
    questionsLabel,
    accuracyLabel,
    formattedDate,
    candidatePhoto,
    downloadFileName
  }), [level, scorePercentage, accuracyRaw, questionsLabel, accuracyLabel, formattedDate, candidatePhoto, downloadFileName]);
};
