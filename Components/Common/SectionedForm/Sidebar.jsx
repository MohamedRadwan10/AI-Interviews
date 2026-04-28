import React from "react";
import { Info, Briefcase, Layers, FileText, ListChecks, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { map, get } from "lodash-es"; // lodash map is fine, but get should be getVal
import { getVal } from "@/Utils/Func/Common";
import MainButton from "../MainButton";

const ICON_MAP = {
  basic: Info,
  details: Briefcase,
  skills: Layers,
  description: FileText,
  requirements: ListChecks,
};

const FormSidebar = ({ sections, activeTab, setActiveTab, errors, touched, values }) => {
  const gv = (obj, path) => getVal(obj, null, path);

  return (
    <div className="lg:w-64 shrink-0 space-y-2">
      {map(sections, (section) => {
        const Icon = ICON_MAP[section.id] || Info;
        const sectionFields = map(section.fields, "field_name");
        const hasError = sectionFields.some(f => gv(errors, f) !== "N/A" && gv(touched, f) !== "N/A");
        const isCompleted = sectionFields.every(f => gv(values, f) !== "N/A" && gv(errors, f) === "N/A");
        const isActive = activeTab === section.id;
        
        const onSectionClick = () => setActiveTab(section.id);
        const sectionTitle = section.title;

        const btnClass = `w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
          isActive 
            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105" 
            : "bg-white dark:bg-white/5 text-ui-textMuted dark:text-ui-muted hover:bg-light-primary/50 dark:hover:bg-brand-primary border border-ui-borderLight dark:border-dark-gray"
        }`;

        return (
          <MainButton
            key={section.id}
            type="button"
            onClick={onSectionClick}
            className={btnClass}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-light-primary dark:bg-dark-primary-3"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">{sectionTitle}</span>
            </div>
            <div className="flex items-center">
              {hasError ? (
                <AlertCircle className="w-4 h-4 text-status-error" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-status-success" />
              ) : (
                <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${isActive ? "opacity-100" : ""}`} />
              )}
            </div>
          </MainButton>
        );
      })}
    </div>
  );
};

export default FormSidebar;
