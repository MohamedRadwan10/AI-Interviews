"use client";
import React from "react";
import { Briefcase, Calendar } from "lucide-react";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const ExperienceSection = ({ workExperiences }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-3 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-lg flex flex-col gap-6 transition-colors duration-200">
      <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-white/5 pb-4">
        <Briefcase className="w-5 h-5 text-brand-primary" />
        <MainText
          tag="h2"
          title="Work Experience"
          className="text-lg font-bold text-ui-textMain dark:text-dark-white"
        />
      </div>

      <div className="relative border-l-2 border-brand-primary/20 ml-3 pl-6 flex flex-col gap-8">
        {map(workExperiences, (exp) => (
          <div key={exp.id} className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 border-light-white dark:border-dark-primary-3 group-hover:scale-125 transition-transform" />

            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <MainText
                  tag="h3"
                  title={exp.title}
                  className="font-bold text-base text-ui-textMain dark:text-dark-white"
                />
                <div className="flex items-center gap-2 bg-light-blue50 dark:bg-white/5 px-3 py-1 rounded-xl text-xs text-ui-textMuted dark:text-ui-muted border border-ui-borderLight dark:border-white/5 shrink-0 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{exp.dateRange || `${exp.startDate} - ${exp.endDate}`}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
                <span>{exp.company}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
                <span className="bg-brand-primary/10 px-2.5 py-0.5 rounded-md text-[10px]">
                  {exp.employmentType}
                </span>
              </div>

              <MainText
                tag="p"
                title={exp.description}
                className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed mt-1"
              />
            </div>
          </div>
        ))}

        {workExperiences.length === 0 && (
          <MainText
            title="No work experiences listed."
            className="text-sm text-ui-textMuted dark:text-ui-muted py-4"
          />
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
