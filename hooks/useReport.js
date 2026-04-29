"use client";
import { useMemo, useContext } from "react";
import { useApi } from "./useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { get, map, size } from "lodash-es";

export const useReport = (sessionId, userId) => {
  const { userToken } = useContext(UserTokenContext);

  const { data, loading, error, refetch } = useApi({
    type: "report",
    urlSuffix: `/${sessionId}/${userId}`,
    autoFetch: !!sessionId && !!userToken && !!userId,
  });  

  return useMemo(() => {
    const report = get(data, "report", data) || {};
    const questionsArray = Array.isArray(report.questions) ? report.questions : [];

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
