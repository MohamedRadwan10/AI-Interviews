import React from "react";
import { Clock, User, CheckCircle2, AlertCircle } from "lucide-react";
import MainText from "@/Components/Common/MainText";
import AudioLevelMeter from "@/Components/Common/AudioLevelMeter";
import Webcam from "react-webcam";
import MainImage from "@/Components/Common/Image";
import { useInterviewSidebar } from "@/hooks/useInterviewSession";

export const InterviewSidebar = ({ isConnected, isSessionStarted }) => {
  const { timeLeft, formatTime, webcamRef, stream } = useInterviewSidebar(isSessionStarted);

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white dark:bg-dark-primary-4 p-4 rounded-2xl border border-ui-borderLight dark:border-ui-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-ui-textMuted dark:text-ui-muted">
          <Clock className="w-4 h-4" />
          <MainText className="text-sm font-medium">Time Left</MainText>
        </div>
        <MainText className="text-xl font-bold font-mono text-brand-primary">
          {formatTime(timeLeft)}
        </MainText>
      </div>

      <div className="aspect-video bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 rounded-3xl border border-ui-borderLight dark:border-ui-border flex flex-col items-center justify-center p-6 text-center shadow-inner">
        <div className="w-20 h-20 bg-white dark:bg-dark-primary-4 rounded-full overflow-hidden flex items-center justify-center shadow-lg mb-4 border-4 border-brand-primary/20">
          <MainImage 
            src="/assets/images/ai-avatar.png" 
            alt="AI Interviewer" 
            imageClassName="w-full h-full object-cover"
            preview={false}
          />
        </div>
        <MainText className="text-lg font-bold text-ui-textMain dark:text-white">AI Interviewer</MainText>
        <MainText className="text-xs text-ui-textMuted dark:text-ui-muted mt-1">Listening to your response...</MainText>
      </div>

      <div className="space-y-4">
        <div className="aspect-video bg-black rounded-3xl overflow-hidden border-2 border-ui-borderLight dark:border-ui-border relative shadow-lg group">
          <Webcam 
            ref={webcamRef}
            audio={true}
            muted={true}
            className="w-full h-full object-cover" 
            mirrored 
          />
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-2 text-[10px] text-white">
            <div className="w-1.5 h-1.5 rounded-full bg-status-error animate-ping" />
            LIVE
          </div>
        </div>

        {stream && <AudioLevelMeter stream={stream} />}
      </div>

      <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${isConnected ? "bg-status-success/5 border-status-success/20 text-status-success" : "bg-status-warning/5 border-status-warning/20 text-status-warning"}`}>
        {isConnected ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4 animate-bounce" />}
        <MainText className="text-xs font-medium">
          {isConnected ? "Real-time AI Connected" : "Connecting to AI..."}
        </MainText>
      </div>
    </div>
  );
};
