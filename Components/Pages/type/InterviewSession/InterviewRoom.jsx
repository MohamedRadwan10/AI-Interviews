"use client";
import React, { useEffect } from "react";
import MainText from "../../../Common/MainText";
import AnswerConsole from "./AnswerConsole";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { InterviewComplete } from "./InterviewComplete";
import { InterviewError } from "./InterviewError";
import { InterviewSidebar } from "./InterviewSidebar";
import { get } from "lodash-es";

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
  } = useInterviewSession(jobId);

  useEffect(() => {
    if (isConnected && !isSessionStarted && !error && !isLoading) {
      startInterview();
    }
  }, [isConnected, isSessionStarted, error, isLoading, startInterview]);

  if (interviewFinished) return <InterviewComplete message={finishMessage} />;
  if (error) return <InterviewError error={error} />;
  if (!isSessionStarted) return <RouteLoading type="interviewRoom" />;

  const questionText = get(currentQuestion, "questionText", `Preparing question ${questionIndex + 1}...`);

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-100px)]">
      <InterviewSidebar isConnected={isConnected} isSessionStarted={isSessionStarted} />

      <div className="lg:col-span-9 flex flex-col gap-6 h-full">
        <div className="bg-white dark:bg-dark-primary-4 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-brand-primary">
            <div className="w-1 h-6 bg-brand-primary rounded-full" />
            <MainText className="uppercase tracking-widest text-xs font-bold">
              Question {questionIndex + 1}
            </MainText>
          </div>
          <MainText tag="h2" className="text-2xl font-semibold leading-relaxed text-ui-textMain dark:text-white">
            {questionText}
          </MainText>
        </div>

        <div className="flex-1">
          <AnswerConsole 
            onSubmit={submitAnswer} 
            isSubmitting={isSubmitting} 
            isLastQuestion={isLastQuestion} 
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
