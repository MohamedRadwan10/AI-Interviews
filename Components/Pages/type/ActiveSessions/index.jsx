"use client";
import React from "react";
import { useInterviewSessions } from "@/hooks/useActiveSessions";
import MainCard from "@/Components/Common/Cards";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import SectionHeader from "@/Components/Header/SectionHeader";
import { useNavigation } from "@/hooks/common";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { map } from "lodash-es";

const ActiveSessionsPage = () => {
  const { activeSessions, isLoading } = useInterviewSessions();
  const { navigateTo } = useNavigation();

  if (isLoading) return <RouteLoading type="activeSessions" />;

  const onBrowseJobs = () => navigateTo("/intelliHire/jobs");
  
  const sessionsSubTitle = activeSessions.length > 0 ? "You have sessions that need completion" : "No active sessions found";

  return (
    <div className="container mx-auto p-6">
      <SectionHeader title="Active Sessions" subTitle={sessionsSubTitle} />
      
      {activeSessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {map(activeSessions, (session) => (
            <MainCard 
              key={session.sessionid} 
              type="activeSession" 
              session={session} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-brand-primary/10 p-6 rounded-full mb-4">
            <i className="pi pi-info-circle text-4xl text-brand-primary"></i>
          </div>
          <MainText tag="h2" title={"No Active Sessions"} className="text-2xl font-bold text-ui-textMain dark:text-white mb-2" />
          <MainText tag="p" title={"You don't have any interviews in progress right now."} className="text-ui-textMuted dark:text-ui-muted mb-6" />
          <MainButton onClick={onBrowseJobs} className="bg-brand-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-primary/90 transition-colors" title={"Browse Jobs"} />
        </div>
      )}
    </div>
  );
};

export default ActiveSessionsPage;
