"use client";
import { get, flatten, map, set } from "lodash-es";
import { useFormik } from "formik";
import { buildValidationSchema } from "@/Utils/Func/ValidationSchema";
import { useMemo, useState } from "react";
import FormSidebar from "./SectionedForm/Sidebar";
import FormSection from "./SectionedForm/Section";
import FormActions from "./SectionedForm/Actions";

const SectionedForm = (props) => {
  const { config = {}, onSubmit, isLoading = false, initialValues } = props;
  const sections = get(config, "sections", []);
  const fields = useMemo(() => flatten(map(sections, "fields")), [sections]);
  const [activeTab, setActiveTab] = useState(sections[0]?.id || "");

  const validationSchema = useMemo(() => buildValidationSchema(fields), [fields]);

  const formik = useFormik({
    initialValues: initialValues || fields.reduce((acc, field) => {
      const fieldName = get(field, "field_name");
      const fieldType = get(field, "type");
      set(acc, fieldName, fieldType === "checkBox" ? false : "");
      return acc;
    }, {}),
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, actions) => {
      const isLast = activeTab === sections[sections.length - 1]?.id;
      if (!isLast) {
        actions.setSubmitting(false);
        return;
      }
      if (onSubmit) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("[SectionedForm] Submission failed:", error);
        }
      }
      actions.setSubmitting(false);
    },
  });

  const sharedProps = {
    sections,
    activeTab,
    setActiveTab,
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    formik
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <FormSidebar {...sharedProps} />

      <div className="flex-1 space-y-6">
        <form onSubmit={formik.handleSubmit} onKeyDown={handleFormKeyDown} className="space-y-6">
          {map(sections, (section) => (
            <FormSection key={section.id} section={section} {...sharedProps} />
          ))}

          <FormActions 
            {...sharedProps}
            isValid={formik.isValid}
            isSubmitting={formik.isSubmitting}
            isLoading={isLoading}
            submitButtonText={get(config, "submitButtonText", "Submit")}
          />
        </form>
      </div>
    </div>
  );
};

export default SectionedForm;
