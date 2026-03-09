"use client";
import React from "react";
import { InputText } from "primereact/inputtext";

const EmailField = ({
  value,
  onChange,
  onBlur,
  label,
  containerClassName,
  error,
  field_name,
  fieldClassName
}) => {
  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <label className="block mb-1 font-medium">{label}</label>
      <InputText
        id={field_name}
        name={field_name}
        type="email"
        value={value}
        onChange={(e) =>
          onChange({ target: { name: field_name, value: e.target.value } })
        }
        onBlur={onBlur}
        placeholder="Enter your email"
        className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"} ${fieldClassName}`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default EmailField;
