"use client";
import { useMemo, useContext } from "react";
import { useApi } from "./useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { get, map, size } from "lodash-es";

export const useReport = (sessionId) => {
  const { userToken } = useContext(UserTokenContext);

  const { data, loading, error, refetch } = useApi({
    type: "report",
    urlSuffix: `/${sessionId}`,
    autoFetch: !!sessionId && !!userToken,
  });

  return useMemo(() => {
    const report = get(data, "report", data) || {};
    const questionsArray = Array.isArray(report.questions) ? report.questions : [];

    const overallScore = get(report, "overallScore", 0);
    const jobTitle = get(report, "roleApplied", "Interview Report");
    const company = get(report, "company", "");
    const sessionDate = get(report, "createdAt", null);
    const totalQuestions = get(report, "totalQuestionsCount", size(questionsArray));
    const questionsAnswered = get(report, "questionsAnsweredCount", 0);
    const accuracyPercent = get(report, "accuracyPercent", 0);

    const feedback = get(report, "performanceSummary", "");
    const strengthPoints = get(report, "strengthPoints", "");
    const weaknessesPoints = get(report, "weaknessesPoints", "");
    const improvementsTips = get(report, "improvementsTips", "");
    const skillAnalysis = get(report, "skillAnalysis", []);

    const scoreBreakdown = map(questionsArray, (q, index) => ({
      index: index + 1,
      question: get(q, "questionText", ""),
      answer: get(q, "userAnswer", "No User Answer"),
      idealAnswer: get(q, "idealAnswer", ""),
    }));

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
      feedback,
      strengthPoints,
      weaknessesPoints,
      improvementsTips,
      skillAnalysis,
      scoreBreakdown,
      scoreLevel,
      isLoading: loading,
      error,
      refetch,
      sessionId,
    };
  }, [data, loading, error, refetch, sessionId]);
};
