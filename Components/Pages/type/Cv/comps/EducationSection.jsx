"use client";
import React from "react";
import { GraduationCap, Landmark } from "lucide-react";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const EducationSection = ({ education }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-3 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-lg flex flex-col gap-6 transition-colors duration-200">
      <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-white/5 pb-4">
        <GraduationCap className="w-5 h-5 text-brand-primary" />
        <MainText
          tag="h2"
          title="Education"
          className="text-lg font-bold text-ui-textMain dark:text-dark-white"
        />
      </div>

      <div className="flex flex-col gap-6">
        {map(education, (edu) => (
          <div key={edu.id} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 flex items-center justify-center text-brand-primary shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <MainText
                  tag="h3"
                  title={`${edu.degree || ""} in ${edu.major || ""}`}
                  className="font-bold text-sm text-ui-textMain dark:text-dark-white"
                />
                <span className="text-[10px] text-ui-textMuted dark:text-ui-muted bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 px-2 py-0.5 rounded-md self-start sm:self-auto">
                  {edu.dateRange}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-brand-primary">
                <Landmark className="w-3.5 h-3.5" />
                <span>{edu.institution}</span>
              </div>

              {edu.gpa && edu.gpa !== "Unknown GPA" && (
                <div className="text-[11px] font-bold text-status-success mt-1">
                  GPA: {edu.gpa}
                </div>
              )}
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <MainText
            title="No education history listed."
            className="text-sm text-ui-textMuted dark:text-ui-muted py-4"
          />
        )}
      </div>
    </div>
  );
};

export default EducationSection;
