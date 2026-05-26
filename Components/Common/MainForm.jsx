"use client";
import { set, map, get } from "lodash-es";
import { useFormik } from "formik";
import { getVal } from "@/Utils/Func/Common";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { buildValidationSchema } from "@/Utils/Func/ValidationSchema";
import { useMemo } from "react";

const MainForm = (props) => {
  const gv = (obj, path, fb) => getVal(obj, null, path, fb);
  const config = gv(props, "config", {});
  const onSubmit = gv(props, "onSubmit");
  const isLoading = gv(props, "isLoading", false);
  const fields = gv(config, "fields", []);
  const submitButtonText = gv(config, "submitButtonText");

  const validationSchema = useMemo(
    () => buildValidationSchema(fields),
    [fields],
  );

  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => {
      const fieldName = gv(field, "field_name");
      const fieldType = gv(field, "type");
      set(acc, fieldName, fieldType === "checkBox" ? false : "");
      return acc;
    }, {}),
    validationSchema,
    onSubmit: async (values, actions) => {
      if (typeof onSubmit === "function") {
        try {
          await onSubmit(values);
        } catch (error) {
        }
      }
      actions.setSubmitting(false);
    },
  });

  const isValid = gv(formik, "isValid");
  const isSubmitting = gv(formik, "isSubmitting");
  const values = gv(formik, "values", {});
  const touched = gv(formik, "touched", {});
  const errors = gv(formik, "errors", {});

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="flex flex-col gap-1">
        {map(fields, (field) => {
          const fieldName = gv(field, "field_name");
          const fieldType = gv(field, "type");
          const onValueChange = gv(field, "onValueChange");

          const rawOptions = gv(field, "options");
          const options = typeof rawOptions === "function" ? rawOptions(values) : rawOptions;
          
          const fieldValue = gv(values, fieldName);
          const fieldError = gv(touched, fieldName) !== "N/A" && gv(errors, fieldName) !== "N/A" ? gv(errors, fieldName) : null;

          const handleFieldChange = (e) => {
            const isCheck = fieldType === "checkBox";
            const val = isCheck ? get(e, "target.checked", e) : get(e, "target.value", e);
            
            formik.setFieldValue(fieldName, val);
            
            if (typeof onValueChange === "function") {
              onValueChange(val, { setFieldValue: formik.setFieldValue });
            }
          };

          return (
            <MainInput
              key={fieldName}
              {...field}
              field_name={fieldName}
              type={fieldType}
              value={fieldValue}
              error={fieldError}
              onChange={handleFieldChange}
              onBlur={formik.handleBlur}
              options={options}
            />
          );
        })}
      </div>

      <MainButton
        type="submit"
        className="w-full flex justify-center items-center py-2 mt-4 bg-light-secondary dark:bg-dark-secondary text-white rounded-md hover:opacity-90 transition-opacity"
        disabled={isSubmitting || isLoading}
        isLoading={isLoading || isSubmitting}
      >
        {submitButtonText}
      </MainButton>
    </form>
  );
};

export default MainForm;
