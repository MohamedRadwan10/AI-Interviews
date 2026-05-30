"use client";
import React from "react";
import { Laptop } from "lucide-react";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const SkillsSection = ({ skills }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-3 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-lg flex flex-col gap-6 transition-colors duration-200">
      <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-white/5 pb-4">
        <Laptop className="w-5 h-5 text-brand-primary" />
        <MainText
          tag="h2"
          title="Technical Skills"
          className="text-lg font-bold text-ui-textMain dark:text-dark-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {map(skills, (skill) => (
          <span
            key={skill.id}
            className="px-3.5 py-1.5 rounded-xl bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 hover:border-brand-primary/40 hover:bg-brand-primary/10 text-ui-textMain dark:text-dark-white font-medium text-xs transition-all cursor-default"
          >
            {skill.name}
          </span>
        ))}

        {skills.length === 0 && (
          <MainText
            title="No skills listed."
            className="text-sm text-ui-textMuted dark:text-ui-muted py-4"
          />
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
