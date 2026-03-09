import { Formik } from "formik";
import MainInput from "@/Components/Common/Inputs";
import { loginFormConfig } from "@/Config/FieldsConfig";
import { buildValidationSchema } from "@/Utils/Func/ValidationSchema";
import React from "react";
import MainButton from "@/Components/Common/MainButton";
import { map } from "lodash-es";

const LoginForm = () => {
  const validationSchema = buildValidationSchema(loginFormConfig);

  const initialValues = loginFormConfig.reduce((acc, field) => {
    acc[field.field_name] = "";
    return acc;
  }, {});

  initialValues.rememberMe = false;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form Values:", values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {map(loginFormConfig, (field) => (
            <MainInput
              key={field.field_name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={formik.values[field.field_name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.field_name] &&
                formik.errors[field.field_name]
              }
              containerClassName={field.containerClassName}
              fieldClassName={field.fieldClassName}
              field_name={field.field_name}
            />
          ))}

          <div className="flex items-center justify-between text-sm mt-2 mb-4">
            <label className="flex items-center gap-2 dark:text-dark-gray text-light-gray cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="border-0 cursor-pointer"
              />
              Remember me
            </label>

            <button
              type="button"
              className="dark:text-dark-primary-2 text-light-secondary hover:underline"
            >
              Forgot password ?
            </button>
          </div>

          <MainButton
            label="Login"
            type="submit"
            className="w-full mt-4 py-2 text-light-white dark:text-dark-white dark:bg-dark-primary-2 bg-light-secondary"
          />
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
