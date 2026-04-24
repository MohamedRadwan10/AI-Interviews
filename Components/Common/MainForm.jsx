import { map, get, set } from "lodash-es";
import { useFormik } from "formik";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { buildValidationSchema } from "@/Utils/Func/ValidationSchema";
import { useMemo } from "react";

const MainForm = (props) => {
  const config = get(props, "config", {});
  const onSubmit = get(props, "onSubmit");
  const isLoading = get(props, "isLoading", false);
  const fields = get(config, "fields", []);
  const submitButtonText = get(config, "submitButtonText");

  const validationSchema = useMemo(
    () => buildValidationSchema(fields),
    [fields],
  );

  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => {
      const fieldName = get(field, "field_name");
      const fieldType = get(field, "type");
      set(acc, fieldName, fieldType === "checkBox" ? false : "");
      return acc;
    }, {}),
    validationSchema,
    onSubmit: async (values, actions) => {
      if (onSubmit) {
        try {
          await onSubmit(values);
        } catch (error) {
        }
      }
      actions.setSubmitting(false);
    },
  });

  const isValid = get(formik, "isValid");
  const isSubmitting = get(formik, "isSubmitting");
  const values = get(formik, "values", {});
  const touched = get(formik, "touched", {});
  const errors = get(formik, "errors", {});

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="flex flex-col gap-1">
        {map(fields, (field) => {
          const fieldName = get(field, "field_name");
          const fieldType = get(field, "type");
          const onValueChange = get(field, "onValueChange");

          const rawOptions = get(field, "options");
          const options = typeof rawOptions === "function" ? rawOptions(values) : rawOptions;

          return (
            <MainInput
              key={fieldName}
              field_name={fieldName}
              type={fieldType}
              label={get(field, "label")}
              placeholder={get(field, "placeholder")}
              value={get(values, fieldName)}
              error={get(touched, fieldName) && get(errors, fieldName)}
              onChange={(e) => {
                const isCheck = fieldType === "checkBox";
                const val = isCheck ? get(e, "target.checked", e) : get(e, "target.value", e);
                
                formik.setFieldValue(fieldName, val);
                
                if (onValueChange) {
                  onValueChange(val, { setFieldValue: formik.setFieldValue });
                }
              }}
              onBlur={formik.handleBlur}
              fieldClassName={get(field, "fieldClassName")}
              containerClassName={get(field, "containerClassName")}
              options={options}
            />
          );
        })}
      </div>

      <MainButton
        type="submit"
        className="w-full flex justify-center items-center py-2 mt-4 bg-light-secondary dark:bg-dark-secondary text-white rounded-md hover:opacity-90 transition-opacity"
        disabled={!isValid || isSubmitting || isLoading}
        isLoading={isLoading || isSubmitting}
      >
        {submitButtonText}
      </MainButton>
    </form>
  );
};

export default MainForm;
