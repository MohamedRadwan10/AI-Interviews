import React from "react";
import MainText from "@/Components/Common/MainText";
import MainImage from "@/Components/Common/Image";
import { User, Mail, Phone, Briefcase, Building2 } from "lucide-react";

const CandidateInfo = ({ photo, fullName, email, phoneNumber, roleApplied, company }) => {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-light-primary dark:bg-dark-primary-3 shrink-0 border border-ui-borderLight dark:border-ui-border">
          {photo ? (
            <MainImage src={photo} alt={fullName} width={96} height={96} imageClassName="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-primary">
              <User size={40} />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <MainText tag="h2" title={fullName || "Candidate Name"} className="text-xl font-bold text-ui-textMain dark:text-white" />
            <MainText tag="span" title="Candidate" className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5 text-ui-textMuted dark:text-ui-muted">
              <div className="p-1.5 rounded-lg bg-light-primary dark:bg-dark-primary-3">
                <Mail size={14} className="text-brand-primary" />
              </div>
              <MainText title={email || "N/A"} className="text-sm truncate" />
            </div>
            <div className="flex items-center gap-2.5 text-ui-textMuted dark:text-ui-muted">
              <div className="p-1.5 rounded-lg bg-light-primary dark:bg-dark-primary-3">
                <Phone size={14} className="text-brand-primary" />
              </div>
              <MainText title={phoneNumber || "N/A"} className="text-sm" />
            </div>
            <div className="flex items-center gap-2.5 text-ui-textMuted dark:text-ui-muted">
              <div className="p-1.5 rounded-lg bg-light-primary dark:bg-dark-primary-3">
                <Briefcase size={14} className="text-brand-primary" />
              </div>
              <MainText title={roleApplied || "Technical Role"} className="text-sm font-medium text-ui-textMain dark:text-white" />
            </div>
            <div className="flex items-center gap-2.5 text-ui-textMuted dark:text-ui-muted">
              <div className="p-1.5 rounded-lg bg-light-primary dark:bg-dark-primary-3">
                <Building2 size={14} className="text-brand-primary" />
              </div>
              <MainText title={company || "IntelliHire"} className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfo;
