"use client";
import React from "react";
import { FolderGit2 } from "lucide-react";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const ProjectsSection = ({ projects }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-3 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-lg flex flex-col gap-6 transition-colors duration-200">
      <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-white/5 pb-4">
        <FolderGit2 className="w-5 h-5 text-brand-primary" />
        <MainText
          tag="h2"
          title="Projects"
          className="text-lg font-bold text-ui-textMain dark:text-dark-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {map(projects, (proj) => (
          <div
            key={proj.id}
            className="flex flex-col justify-between gap-4 p-5 rounded-2xl bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 hover:border-brand-primary/30 transition-all group"
          >
            <div className="flex flex-col gap-2">
              <MainText
                tag="h3"
                title={proj.title}
                className="font-bold text-base text-ui-textMain dark:text-dark-white group-hover:text-brand-primary transition-colors"
              />
              <MainText
                tag="p"
                title={proj.description}
                className="text-xs text-ui-textMuted dark:text-ui-muted leading-relaxed"
              />
            </div>

            {proj.technologies && proj.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {map(proj.technologies, (tech) => (
                  <span
                    key={tech}
                    className="bg-light-main dark:bg-white/5 text-ui-textMuted dark:text-ui-muted text-[10px] px-2 py-0.5 rounded-md border border-ui-borderLight dark:border-white/5 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <MainText
            title="No projects listed."
            className="text-sm text-ui-textMuted dark:text-ui-muted py-4 col-span-2"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
