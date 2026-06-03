"use client";
import { map, get } from "lodash-es";
import { getVal } from "@/Utils/Func/Common";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { useMainForm } from "@/hooks/useAuth";

const MainForm = ({ config, onSubmit, isLoading }) => {
  const gv = (obj, path, fb) => getVal(obj, null, path, fb);
  const submitButtonText = gv(config, "submitButtonText");

  const { formik, fields, buildFieldHandler, values, touched, errors, isSubmitting } = useMainForm({ config, onSubmit });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="flex flex-col gap-1">
        {map(fields, (field) => {
          const fieldName   = gv(field, "field_name");
          const fieldType   = gv(field, "type");
          const rawOptions  = gv(field, "options");
          const options     = typeof rawOptions === "function" ? rawOptions(values) : rawOptions;
          const fieldValue  = gv(values, fieldName);
          const fieldTouched = get(touched, fieldName);
          const fieldError  = fieldTouched ? get(errors, fieldName) : null;

          return (
            <MainInput
              key={fieldName}
              {...field}
              field_name={fieldName}
              type={fieldType}
              value={fieldValue}
              error={fieldError}
              onChange={buildFieldHandler(field)}
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