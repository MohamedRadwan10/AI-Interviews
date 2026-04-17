"use client";
import React from "react";
import { useAudioLevel } from "@/hooks/useInterviewSession";
import { Mic } from "lucide-react";

const AudioLevelMeter = ({ stream }) => {
  const level = useAudioLevel(stream);

  return (
    <div className="flex items-center gap-3 w-full bg-light-primary/50 dark:bg-dark-primary-3/50 p-3 rounded-xl border border-ui-borderLight dark:border-ui-border">
      <Mic className={`w-4 h-4 ${level > 5 ? "text-brand-primary animate-pulse" : "text-ui-textMuted"}`} />
      <div className="flex-1 h-2 bg-ui-borderLight dark:bg-ui-border rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-primary transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(var(--brand-primary-rgb),0.5)]"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-ui-textMuted w-8 text-right">
        {level}%
      </span>
    </div>
  );
};

export default AudioLevelMeter;
