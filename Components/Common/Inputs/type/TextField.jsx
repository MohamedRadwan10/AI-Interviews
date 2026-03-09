import React from "react";
import { InputText } from "primereact/inputtext";

const TextField = ({
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  error,
  containerClassName,
  fieldClassName,
}) => {
  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <label htmlFor="text" className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <InputText
        id="text"
        name="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder || "Enter text"}
        className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"} ${fieldClassName}`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default TextField;
