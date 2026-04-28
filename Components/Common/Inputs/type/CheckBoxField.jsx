"use client";
import React, { useMemo } from "react";
import { getVal } from "@/Utils/Func/Common";
import { Checkbox } from "primereact/checkbox";
import MainText from "@/Components/Common/MainText";

const CheckBoxField = (props) => {
  const { field_name, value = false, onChange, onBlur, label, error, containerClassName = "", fieldClassName = "", validation } = props;
  const isRequired = getVal(validation, null, "required", false);

  const labelContent = useMemo(() => {
    if (!label) return null;
    return <MainText tag="label" htmlFor={field_name} title={label} className="cursor-pointer font-medium text-ui-textMuted dark:text-dark-gray text-sm" />;
  }, [label, field_name]);

  const requiredIndicator = useMemo(() => {
    if (!isRequired) return null;
    return <span className="text-status-error text-xs">*</span>;
  }, [isRequired]);

  const errorContent = useMemo(() => {
    if (!error) return null;
    return <MainText title={error} className="text-status-error text-[10px] mt-1" />;
  }, [error]);

  const handleCheckboxChange = (e) => onChange?.({ target: { name: field_name, checked: e.checked } });

  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <div className="flex items-center gap-2">
        <Checkbox
          inputId={field_name}
          name={field_name}
          checked={value}
          onChange={handleCheckboxChange}
          onBlur={onBlur}
          className={fieldClassName}
        />
        <div className="flex items-center gap-1">
          {labelContent}
          {requiredIndicator}
        </div>
      </div>
      {errorContent}
    </div>
  );
};

export default CheckBoxField;
