"use client";
import React, { useMemo } from "react";
import { getVal } from "@/Utils/Func/Common";
import { Dropdown } from "primereact/dropdown";
import MainText from "@/Components/Common/MainText";

const SelectField = (props) => {
  const { field_name, value = "", onChange, onBlur, label, placeholder = "Select an option", options = [], error, containerClassName = "", fieldClassName = "", validation } = props;
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

  const handleDropdownChange = (e) => onChange?.({ target: { name: field_name, value: e.value } });

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <div className="flex items-center gap-1 mb-1">
        {labelContent}
        {requiredIndicator}
      </div>
      <Dropdown
        id={field_name}
        name={field_name}
        value={value}
        options={options}
        optionLabel="label"
        optionValue="value"
        onChange={handleDropdownChange}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        placeholder={placeholder}
        filter

        className={`w-full border rounded outline-none focus:border-brand-primary transition-all bg-light-blue50 dark:bg-dark-primary-3 ${
          error ? "border-status-error" : "border-ui-borderLight dark:border-dark-gray"
        } ${fieldClassName}`}
        pt={{
          root: { className: "flex items-center" },
          input: { className: `p-2 text-light-black dark:text-dark-white !bg-transparent ${!value ? "opacity-50" : "opacity-100"}` },
          trigger: { className: "text-light-black dark:text-dark-white px-2" },
          item: { className: "text-light-black dark:text-dark-white hover:!bg-light-secondary/20 dark:hover:!bg-dark-primary-2 cursor-pointer p-2 m-1 rounded transition-colors" },
          panel: { className: "bg-light-primary dark:bg-dark-primary-1 border border-ui-borderLight dark:border-ui-border shadow-lg rounded-lg" },
          header: { className: "bg-light-primary dark:bg-dark-primary-1 border-b border-ui-borderLight dark:border-ui-border p-2" },
          filterInput: { className: "p-2 bg-light-primary dark:bg-dark-primary-3 text-light-black dark:text-dark-white border border-ui-borderLight dark:border-ui-border rounded w-full" },
          emptyMessage: { className: "p-3 text-light-black dark:text-dark-white opacity-60" }
        }}
      />
      {errorContent}
    </div>
  );
};

export default SelectField;
