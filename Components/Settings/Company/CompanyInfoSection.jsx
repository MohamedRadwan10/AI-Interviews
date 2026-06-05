"use client";
import React from "react";
import { Formik, Form } from "formik";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { companyPersonalConfig } from "@/Config/settingConfig";

const CompanyInfoSection = ({ initialValues, validationSchema, onSubmit, infoLoading, handleBlur, onCancel }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6 w-full font-sans">
      <div>
        <MainText tag="h2" title="Company Information" className="text-xl font-bold text-ui-textMain dark:text-white" />
        <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="flex flex-col gap-6">
            <div className="flex items-center gap-6 py-2">
              <div className="w-24 h-24 !m-0 rounded-full overflow-hidden shrink-0 border-2 border-brand-primary/20 flex items-center justify-center bg-light-blue50 dark:bg-dark-primary-3 relative">
                <MainInput
                  field_name="photo"
                  type="photoUpload"
                  uploadType="image"
                  value={values.photo}
                  error={touched.photo && errors.photo}
                  onChange={(file) => setFieldValue("photo", file)}
                  onBlur={handleBlur}
                  {...companyPersonalConfig.fields[0]}
                  containerClassName="!mb-0 !p-0 !border-0 absolute inset-0 w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-1.5 justify-center">
                <MainButton
                  type="button"
                  onClick={() => document.getElementById("photo-file-input")?.click()}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-ui-borderLight dark:border-dark-gray text-ui-textMain dark:text-white bg-transparent hover:bg-light-blue50/50 dark:hover:bg-white/5 transition-all w-fit"
                  title="Upload Logo"
                />
                <MainText title="JPG or PNG, Max size 2MB" className="text-[11px] text-ui-textMuted dark:text-ui-muted" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <MainInput
                field_name="companyName"
                type="text"
                label="Company Name"
                placeholder="Tech Corp"
                value={values.companyName}
                error={touched.companyName && errors.companyName}
                onChange={(e) => setFieldValue("companyName", e.target.value)}
                onBlur={handleBlur}
                validation={companyPersonalConfig.fields[1].validation}
              />
              <MainInput
                field_name="industry"
                type="select"
                label="Industry"
                placeholder="Select Industry"
                value={values.industry}
                error={touched.industry && errors.industry}
                onChange={(e) => setFieldValue("industry", e.target.value || e)}
                onBlur={handleBlur}
                options={companyPersonalConfig.fields[2].options}
                validation={companyPersonalConfig.fields[2].validation}
              />
              <MainInput
                field_name="phoneNumber"
                type="phone"
                label="Phone Number"
                placeholder="0123456789"
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
                onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
                onBlur={handleBlur}
                validation={companyPersonalConfig.fields[3].validation}
              />
            </div>

            <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />

            <div className="flex justify-end items-center gap-6 mt-2">
              <MainButton
                type="button"
                onClick={onCancel}
                className="text-sm font-semibold text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white bg-transparent border-none outline-none cursor-pointer transition-colors"
                title="Cancel"
              />
              <MainButton
                type="submit"
                disabled={infoLoading}
                className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-2xl hover:bg-brand-primaryDark transition-all shadow-md border-none cursor-pointer"
                title={infoLoading ? "Saving..." : "Save changes"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyInfoSection;
