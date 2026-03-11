"use client";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "./Inputs";
import { buildValidationSchema } from "@/Utils/Func/ValidationSchema";

const MainForm = ({ config, onSubmit }) => {
  const validationSchema = useMemo(
    () => buildValidationSchema(config.fields),
    [config],
  );

  const formik = useFormik({
    initialValues: config.fields.reduce((acc, field) => {
      acc[field.field_name] = field.type === "checkBox" ? false : "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      {config.fields.map((field) => {
        return (
          <MainInput
            key={field.field_name}
            field_name={field.field_name}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            value={formik.values[field.field_name]}
            error={
              formik.touched[field.field_name] &&
              formik.errors[field.field_name]
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fieldClassName={field.fieldClassName}
            containerClassName={field.containerClassName}
          />
        );
      })}

      <MainButton
        type="submit"
        className="w-full flex justify-center items-center py-2 mt-4 bg-light-secondary dark:bg-dark-secondary text-white rounded-md hover:opacity-90 transition-opacity"
        disabled={!formik.isValid || formik.isSubmitting}
      >
        {config.submitButtonText}
      </MainButton>
    </form>
  );
};

export default MainForm;
