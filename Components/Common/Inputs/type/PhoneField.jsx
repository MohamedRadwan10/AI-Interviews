import React from "react";
import { InputText } from "primereact/inputtext";

const PhoneField = ({
  value,
  onChange,
  onBlur,
  label,
  containerClassName,
  error,
  field_name,
  fieldClassName,
}) => {
  const handleChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    onChange({
      target: {
        name: field_name,
        value: onlyNumbers,
      },
    });
  };

  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <label htmlFor={field_name} className="block mb-1 font-medium">
        {label}
      </label>

      <InputText
        id={field_name}
        name={field_name}
        value={value ?? ""}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder="Enter your phone number"
        maxLength={11}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } ${fieldClassName}`}
      />

      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default PhoneField;
