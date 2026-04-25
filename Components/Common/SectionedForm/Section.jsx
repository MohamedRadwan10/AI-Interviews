"use client";
import { map, get } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import MainInput from "@/Components/Common/Inputs";
import { Info, Briefcase, Layers, FileText, ListChecks } from "lucide-react";

const ICON_MAP = {
  basic: Info,
  details: Briefcase,
  skills: Layers,
  description: FileText,
  requirements: ListChecks,
};

const FormSection = ({ section, activeTab, values, errors, touched, formik, sections }) => {
  const Icon = ICON_MAP[section.id] || Info;
  const sectionIndex = sections.findIndex(s => s.id === section.id) + 1;

  if (activeTab !== section.id) return null;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white dark:bg-white/5 rounded-[2.5rem] shadow-xl shadow-black/5 border border-ui-borderLight dark:border-dark-gray overflow-hidden">
        <div className="px-8 py-6 border-b border-ui-borderLight dark:border-dark-gray bg-gradient-to-r from-brand-primary/5 to-transparent dark:from-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <MainText tag="h2" title={section.title} className="text-xl font-bold text-ui-textMain dark:text-white" />
              <MainText title="Please fill in the required details" className="text-xs text-ui-textMuted dark:text-ui-muted" />
            </div>
          </div>
          <span className="text-sm font-medium text-ui-textMuted dark:text-ui-muted bg-light-primary dark:bg-dark-primary-3 px-4 py-1.5 rounded-full border border-ui-borderLight dark:border-dark-gray">
            Section {sectionIndex} of {sections.length}
          </span>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {map(section.fields, (field) => {
            const fieldName = get(field, "field_name");
            const rawOptions = get(field, "options");
            const options = typeof rawOptions === "function" ? rawOptions(values) : rawOptions;

            return (
              <div key={fieldName} className={get(field, "gridClassName", "col-span-1")}>
                <MainInput
                  {...field}
                  field_name={fieldName}
                  value={get(values, fieldName)}
                  error={get(touched, fieldName) && get(errors, fieldName)}
                  onChange={(e) => {
                    const isCheck = field.type === "checkBox";
                    const val = isCheck 
                      ? get(e, "target.checked", e) 
                      : (e && typeof e === 'object' && 'target' in e ? get(e, "target.value", e) : e);
                    
                    formik.setFieldValue(fieldName, val);
                    if (field.onValueChange) field.onValueChange(val, { setFieldValue: formik.setFieldValue });
                  }}
                  onBlur={formik.handleBlur}
                  options={options}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormSection;
