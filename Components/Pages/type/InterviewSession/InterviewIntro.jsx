import React, { useState, useEffect } from "react";
import { Camera, Mic, Play, ShieldCheck, Info } from "lucide-react";
import { map } from "lodash-es";
import MainButton from "../../../Common/MainButton";
import MainText from "../../../Common/MainText";
import AudioLevelMeter from "@/Components/Common/AudioLevelMeter";
import Webcam from "react-webcam";
import { useNavigation } from "@/hooks/common";

const INSTRUCTIONS = [
  "Ensure you are in a quiet room with no background noise.",
  "Position yourself in a well-lit area so the camera can see your face clearly.",
  "The AI will ask you questions based on your CV and the job description.",
  "You can answer via text, voice, or using the built-in code editor.",
  "Each session lasts approximately 20-30 minutes."
];

const InstructionsList = () => (
  <div className="bg-white dark:bg-dark-primary-4 p-10 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm min-h-[550px] flex flex-col justify-center">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-brand-primary/10 rounded-xl">
        <ShieldCheck className="w-6 h-6 text-brand-primary" />
      </div>
      <MainText tag="h2" className="text-2xl font-bold text-ui-textMain dark:text-white">
        Interview Instructions
      </MainText>
    </div>
    
    <ul className="space-y-4">
      {map(INSTRUCTIONS, (text, i) => (
        <li key={i} className="flex gap-4 text-ui-textMuted dark:text-ui-muted text-lg">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold">
            {i + 1}
          </span>
          <MainText>{text}</MainText>
        </li>
      ))}
    </ul>
  </div>
);

const InterviewIntro = ({ jobId }) => {
  const { navigateTo } = useNavigation();
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleAllowAccess = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);
      setError(null);
    } catch {
      setError("Camera or Microphone access denied. Please allow them to continue.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="flex-1 space-y-6">
        <InstructionsList />
      </div>

      <div className="w-full lg:w-[450px] space-y-6">
        <div className="bg-white dark:bg-dark-primary-4 p-10 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm h-full flex flex-col">
          <MainText tag="h3" className="text-xl dark:text-dark-white text-ui-textMain font-semibold mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-brand-primary" /> Device Check
          </MainText>

          <div className="relative aspect-[4/3] bg-light-primary dark:bg-dark-primary-3 rounded-2xl overflow-hidden border mb-6">
            {stream ? (
              <Webcam audio={false} className="w-full h-full object-cover" mirrored />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-ui-textMuted p-4 text-center">
                <Camera className="w-12 h-12 mb-2 opacity-20" />
                <MainText className="text-sm">Camera preview will appear here</MainText>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {stream && <AudioLevelMeter stream={stream} />}

            {!stream ? (
              <MainButton onClick={handleAllowAccess} className="w-full py-4 bg-ui-textMain dark:bg-dark-primary-2 text-white rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Mic className="w-4 h-4" /> Allow Camera & Mic
              </MainButton>
            ) : (
              <MainButton onClick={() => navigateTo(`/intelliHire/interview-session/${jobId}/room`)} className="w-full py-4 bg-brand-primary text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-primaryDark shadow-lg shadow-brand-primary/20">
                Enter Interview Room <Play className="w-4 h-4 fill-current" />
              </MainButton>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-status-error/10 text-status-error rounded-xl text-xs">
                <Info className="w-4 h-4" />
                <MainText>{error}</MainText>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntro;
