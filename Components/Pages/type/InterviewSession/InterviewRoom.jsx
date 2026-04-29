"use client";
import React, { useEffect, useMemo } from "react";
import MainText from "@/Components/Common/MainText";
import AnswerConsole from "@/Components/Pages/type/InterviewSession/AnswerConsole";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { InterviewComplete } from "@/Components/Pages/type/InterviewSession/InterviewComplete";
import { InterviewError } from "@/Components/Errors";
import { InterviewSidebar } from "@/Components/Pages/type/InterviewSession/InterviewSidebar";
import { get } from "lodash-es";
import { Clock, Target, Layers } from "lucide-react";

const InterviewRoom = ({ jobId }) => {
  const { 
    isSessionStarted, 
    currentQuestion, 
    isConnected, 
    isLoading,
    isSubmitting,
    startInterview, 
    submitAnswer, 
    error,
    questionIndex,
    isLastQuestion,
    interviewFinished,
    finishMessage,
    sessionId,
    timeLeft,
    isQuestionReady,
    isFinishing,
  } = useInterviewSession(jobId);

  useEffect(() => {
    if (isConnected && !isSessionStarted && !error && !isLoading) {
      startInterview();
    }
  }, [isConnected, isSessionStarted, error, isLoading, startInterview]);

  let parsedQuestion = currentQuestion;
  if (typeof currentQuestion === "string") {
    try { parsedQuestion = JSON.parse(currentQuestion); } catch (e) { parsedQuestion = {}; }
  }

  const questionText = get(parsedQuestion, "questionText") || get(parsedQuestion, "question") || `Preparing question ${questionIndex + 1}...`;
  const type = get(parsedQuestion, "type");
  const difficulty = get(parsedQuestion, "difficulty");
  const time = get(parsedQuestion, "time");

  const difficultyStyles = {
    hard: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/30",
    medium: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/30",
    easy: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30",
  };

  const currentDiffStyle = difficultyStyles[difficulty?.toLowerCase()] || difficultyStyles.easy;

  const typeBadge = useMemo(() => {
    if (!type) return null;
    return (
      <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30 flex items-center gap-1.5">
        <Layers className="w-3.5 h-3.5" />
        <MainText className="text-[10px] font-bold uppercase tracking-wider">
          {type}
        </MainText>
      </div>
    );
  }, [type]);

  const difficultyBadge = useMemo(() => {
    if (!difficulty) return null;
    return (
      <div className={`px-3 py-1 rounded-full border flex items-center gap-1.5 ${currentDiffStyle}`}>
        <Target className="w-3.5 h-3.5" />
        <MainText className="text-[10px] font-bold uppercase tracking-wider">
          {difficulty}
        </MainText>
      </div>
    );
  }, [difficulty, currentDiffStyle]);

  if (interviewFinished) return <InterviewComplete message={finishMessage} sessionId={sessionId} />;
  if (error) return <InterviewError error={error} />;
  if (!isSessionStarted) return <RouteLoading type="interviewRoom" />;

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-100px)]">
      <InterviewSidebar isConnected={isConnected} isSessionStarted={isSessionStarted} questionTime={timeLeft} />

      <div className="lg:col-span-9 flex flex-col gap-6 h-full">
        <div className="bg-white dark:bg-dark-primary-4 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-brand-primary">
              <div className="w-1.5 h-6 bg-brand-primary rounded-full" />
              <MainText className="uppercase tracking-widest text-xs font-bold">
                {isQuestionReady ? `Question ${questionIndex + 1}` : "System Status"}
              </MainText>
            </div>
            
            <div className="flex items-center gap-3">
               {typeBadge}
               {difficultyBadge}
            </div>
          </div>

          <MainText tag="h2" className="text-2xl font-semibold leading-relaxed text-ui-textMain dark:text-white">
            {isQuestionReady 
              ? questionText 
              : (isFinishing || (isSubmitting && isLastQuestion))
                ? "Submitting your responses and generating your comprehensive feedback report... Please wait."
                : isSubmitting
                  ? "Analyzing your answer and preparing the next question... Please wait."
                  : "Reviewing the job's requirements and your background to prepare your interview questions... We’re about to start"
            }
          </MainText>
        </div>

        <div className="flex-1">
          <AnswerConsole 
            onSubmit={submitAnswer} 
            isSubmitting={isSubmitting} 
            isLastQuestion={isLastQuestion}
            isQuestionReady={isQuestionReady}
            questionType={type}
          />
        </div>

        <div className="flex justify-between items-center bg-white/50 dark:bg-dark-primary-4/50 backdrop-blur-md p-4 rounded-3xl border border-ui-borderLight dark:border-ui-border mt-auto">
          <MainText className="text-xs text-ui-textMuted dark:text-ui-muted">
            Progress saved automatically
          </MainText>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
