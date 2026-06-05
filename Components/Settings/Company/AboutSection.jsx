"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import MainInput from "@/Components/Common/Inputs";
import { companyAboutConfig } from "@/Config/settingConfig";

const AboutSection = ({ values, errors, touched, setFieldValue, handleBlur }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6 w-full font-sans">
      <div>
        <MainText tag="h2" title="About Company" className="text-xl font-bold text-ui-textMain dark:text-white" />
        <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />
      </div>

      <div className="flex flex-col gap-4">
        <MainInput
          field_name="about"
          type="textarea"
          label="About Company"
          placeholder="Tech Crops is a leading provider..."
          value={values.about}
          error={touched.about && errors.about}
          onChange={(e) => setFieldValue("about", e.target.value)}
          onBlur={handleBlur}
          rows={4}
          validation={companyAboutConfig.fields[0].validation}
        />
        
        <MainInput
          field_name="websiteUrl"
          type="text"
          label="Website"
          placeholder="https://techcorp.com"
          value={values.websiteUrl}
          error={touched.websiteUrl && errors.websiteUrl}
          onChange={(e) => setFieldValue("websiteUrl", e.target.value)}
          onBlur={handleBlur}
          validation={companyAboutConfig.fields[1].validation}
        />
      </div>
    </div>
  );
};

export default AboutSection;
