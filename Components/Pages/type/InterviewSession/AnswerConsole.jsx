"use client";
import React from "react";
import { MessageSquare, Mic, Code2, Send } from "lucide-react";
import MainButton from "../../../Common/MainButton";
import MainText from "../../../Common/MainText";
import Editor from "@monaco-editor/react";
import { useAnswerConsole } from "@/hooks/useInterviewSession";
import { map } from "lodash-es";
import MainInput from "../../../Common/Inputs";
import { useDarkMode } from "@/Context/DarkModeContext";
import { languages } from "@/Config/DataConstant";

const AnswerConsole = ({ onSubmit, isSubmitting = false, isLastQuestion = false }) => {
  const {
    activeTab, setActiveTab,
    textAnswer, setTextAnswer,
    codeAnswer, setCodeAnswer,
    language, setLanguage,
    status, startRecording, stopRecording, mediaBlobUrl,
    handleSend,
    hasAnswer
  } = useAnswerConsole(onSubmit);
  const { isDarkMode } = useDarkMode();
  const tabs = [
    { id: "text", icon: MessageSquare, label: "Text" },
    { id: "voice", icon: Mic, label: "Voice" },
    { id: "code", icon: Code2, label: "Code Console" },
  ];

  return (
    <div className="bg-white dark:bg-dark-primary-4 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex border-b border-ui-borderLight dark:border-ui-border p-2 gap-2 bg-light-primary/50 dark:bg-dark-primary-3/30">
        {map(tabs,(tab) => (
          <MainButton
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-white dark:bg-dark-primary-4 text-brand-primary shadow-sm" : "text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white"}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </MainButton>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-hidden min-h-[300px]">
        {activeTab === "text" && (
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-full resize-none bg-transparent border-0 focus:ring-0 text-ui-textMain dark:text-white placeholder:text-ui-textMuted dark:placeholder:text-ui-muted"
          />
        )}

        {activeTab === "voice" && (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className={`p-8 rounded-full transition-all duration-500 ${status === "recording" ? "bg-status-error/20 scale-110 animate-pulse" : "bg-light-primary dark:bg-dark-primary-3"}`}>
              <Mic className={`w-12 h-12 ${status === "recording" ? "text-status-error" : "text-ui-textMuted dark:text-ui-muted"}`} />
            </div>
            <div className="text-center">
              <MainText className="block font-medium mb-1">
                {status === "recording" ? "Recording..." : status === "stopped" ? "Recording Complete" : "Ready to record"}
              </MainText>
            </div>
            <div className="flex gap-3">
              {status !== "recording" ? (
                <MainButton onClick={startRecording} className="px-6 py-2 bg-ui-textMain dark:bg-dark-primary-2 text-white rounded-xl">Start Recording</MainButton>
              ) : (
                <MainButton onClick={stopRecording} className="px-6 py-2 bg-status-error text-white rounded-xl">Stop Recording</MainButton>
              )}
              {mediaBlobUrl && <audio src={mediaBlobUrl} controls className="h-10 rounded-xl bg-light-primary" />}
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="flex flex-col h-full gap-2">
            <div className="flex justify-end w-48 ml-auto">
              <MainInput
                type="select"
                field_name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={languages}
                placeholder="Select Language"
                containerClassName="mb-0"
              />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-ui-borderLight dark:border-ui-border">
              <Editor height="100%" language={language} theme={isDarkMode ? "vs-dark" : "vs-light"} value={codeAnswer} onChange={setCodeAnswer} options={{ minimap: { enabled: false }, fontSize: 14 }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-ui-borderLight dark:border-ui-border flex justify-end">
        <MainButton 
          onClick={handleSend} disabled={isSubmitting || !hasAnswer}
          className={`bg-brand-primary text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-brand-primaryDark transition-all ${(isSubmitting || !hasAnswer) ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Submitting..." : (isLastQuestion ? "Submit & End Interview" : "Send Answer")} <Send className="w-4 h-4" />
        </MainButton>
      </div>
    </div>
  );
};

export default AnswerConsole;
