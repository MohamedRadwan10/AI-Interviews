"use client";
import React from "react";
import { Award, Landmark } from "lucide-react";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const CertificationsSection = ({ certifications }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-3 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-lg flex flex-col gap-6 transition-colors duration-200">
      <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-white/5 pb-4">
        <Award className="w-5 h-5 text-brand-primary" />
        <MainText
          tag="h2"
          title="Certifications"
          className="text-lg font-bold text-ui-textMain dark:text-dark-white"
        />
      </div>

      <div className="flex flex-col gap-5">
        {map(certifications, (cert) => (
          <div
            key={cert.id}
            className="flex flex-col gap-2 p-4 rounded-2xl bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 hover:border-brand-primary/20 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <MainText
                tag="h3"
                title={cert.name}
                className="font-bold text-sm text-ui-textMain dark:text-dark-white"
              />
              <span className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                {cert.type || "Certificate"}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs text-ui-textMuted dark:text-ui-muted">
              <div className="flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-brand-primary" />
                <span>{cert.issuingOrganization}</span>
              </div>
              <div className="text-[10px] mt-1 opacity-70">
                {cert.issueDate}
              </div>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <MainText
            title="No certifications listed."
            className="text-sm text-ui-textMuted dark:text-ui-muted py-4"
          />
        )}
      </div>
    </div>
  );
};

export default CertificationsSection;
