"use client";
import React from "react";
import { postJobConfig } from "@/Config/FieldsConfig";
import { usePostJob } from "@/hooks/useJobs";
import SectionedForm from "@/Components/Common/SectionedForm";
import MainText from "@/Components/Common/MainText";
import { Briefcase } from "lucide-react";

const PostJobPage = () => {
  const { postJob, isLoading } = usePostJob();

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary">
          <Briefcase className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-1">
          <MainText title="Publish a Job Opportunity" className="text-3xl font-bold text-ui-textMain dark:text-dark-white tracking-tight" />
          <MainText title="Fill in the details to find your next great hire" className="text-ui-textMuted dark:text-dark-gray text-sm" />
        </div>
      </div>

      <div className="w-full">
        <SectionedForm 
          config={postJobConfig} 
          onSubmit={postJob} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default PostJobPage;
