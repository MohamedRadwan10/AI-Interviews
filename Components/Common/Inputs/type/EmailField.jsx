"use client";
import React, { useMemo } from "react";
import { getVal } from "@/Utils/Func/Common";
import { InputText } from "primereact/inputtext";
import MainText from "@/Components/Common/MainText";

const EmailField = (props) => {
  const { field_name, value = "", onChange, onBlur, label, placeholder = "Enter your email", error, containerClassName = "", fieldClassName = "", validation } = props;
  const isRequired = getVal(validation, null, "required", false);

  const labelContent = useMemo(() => {
    if (!label) return null;
    return <MainText tag="label" title={label} className="font-medium text-ui-textMuted dark:text-dark-gray text-sm" />;
  }, [label]);

  const requiredIndicator = useMemo(() => {
    if (!isRequired) return null;
    return <span className="text-status-error text-xs">*</span>;
  }, [isRequired]);

  const errorContent = useMemo(() => {
    if (!error) return null;
    return <MainText title={error} className="text-status-error text-[10px] mt-1" />;
  }, [error]);

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <div className="flex items-center gap-1 mb-1">
        {labelContent}
        {requiredIndicator}
      </div>
      <InputText
        id={field_name}
        name={field_name}
        type="email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full p-2 border rounded outline-none focus:border-brand-primary transition-all bg-light-blue50 dark:bg-dark-primary-3 ${
          error ? "border-status-error" : "border-ui-borderLight dark:border-dark-gray"
        } ${fieldClassName}`}
      />
      {errorContent}
    </div>
  );
};

export default EmailField;
