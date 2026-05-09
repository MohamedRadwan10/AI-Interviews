"use client";
import React, { useMemo } from "react";
import { getVal } from "@/Utils/Func/Common";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import MainText from "@/Components/Common/MainText";

const PasswordField = (props) => {
  const { field_name, value = "", onChange, onBlur, label, placeholder = "Enter your password", error, containerClassName = "", fieldClassName = "", validation } = props;
  const isRequired = getVal(validation, null, "required", false);

  const footerContent = useMemo(() => {
    return (
      <>
        <Divider />
        <MainText title={"Suggestions"} className="mt-2 text-sm font-semibold" />
        <ul className="pl-2 ml-2 mt-0 text-xs">
          <li>At least one lowercase</li>
          <li>At least one uppercase</li>
          <li>At least one numeric</li>
          <li>Minimum 8 characters</li>
        </ul>
      </>
    );
  }, []);

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
      <Password
        id={field_name}
        name={field_name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        footer={footerContent}
        placeholder={placeholder}
        toggleMask
        feedback={true}
        autoComplete={props.autoComplete || "current-password"}
        inputClassName={`!w-full p-2 border rounded outline-none focus:border-brand-primary transition-all bg-light-blue50 dark:bg-dark-primary-3 ${
          error ? "border-status-error" : "border-ui-borderLight dark:border-dark-gray"
        } ${fieldClassName}`}
        className="w-full"
        style={{ width: "100%" }}
      />
      {errorContent}
    </div>
  );
};

export default PasswordField;
