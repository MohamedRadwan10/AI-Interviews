"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import FilePreviewCard from "@/Components/Common/FilePreviewCard";
import { candidateResumeConfig } from "@/Config/settingConfig";
import { getVal } from "@/Utils/Func/Common";

const ResumeSection = ({ accountData, pendingCvFile, onCvFileSelect, onCancelCv, onSaveCv, cvLoading }) => {
  const resumeUrl = getVal(accountData, null, "resumeUrl");

  return (
    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6 w-full">
      <div>
        <MainText tag="h2" title="Resume & CV" className="text-xl font-bold text-ui-textMain dark:text-white" />
        <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />
      </div>

      <div className="flex flex-col gap-1">
        <MainText title="Current role" className="text-xs text-ui-textMuted dark:text-ui-muted" />
        <MainText title={getVal(accountData, "cuurentRole", "cuurentRole")} className="text-sm font-bold text-ui-textMain dark:text-white" />
      </div>

      <div className="flex flex-col gap-2">
        <MainText title="Current CV" className="text-sm font-medium text-ui-textMuted dark:text-dark-gray" />
        <FilePreviewCard
          url={resumeUrl}
          label=" Active Resume · Click to view"
          emptyTitle="No resume uploaded"
          emptySubtitle="Upload your CV below"
        />
        {pendingCvFile && (
          <FilePreviewCard
            file={pendingCvFile}
            fileLabel="Selected · Not saved yet"
          />
        )}
      </div>

      <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full" />

      <div className="flex flex-col gap-4">
        <MainInput
          field_name="CvFile"
          type="upload"
          uploadType="file"
          label="Upload New Resume"
          placeholder={pendingCvFile ? pendingCvFile.name : "Click to upload or drag and drop PDF or Word document (max. 5MB)"}
          onChange={onCvFileSelect}
          {...candidateResumeConfig.fields[0]}
        />

        {pendingCvFile && (
          <div className="flex justify-end items-center gap-4">
            <MainButton
              type="button"
              onClick={onCancelCv}
              className="text-sm font-semibold text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white bg-transparent border-none outline-none cursor-pointer transition-colors"
              title="Cancel"
            />
            <MainButton
              type="button"
              onClick={onSaveCv}
              disabled={cvLoading}
              className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-2xl hover:bg-brand-primaryDark transition-all shadow-md border-none cursor-pointer disabled:opacity-60"
              title={cvLoading ? "Uploading..." : "Save Resume"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;
