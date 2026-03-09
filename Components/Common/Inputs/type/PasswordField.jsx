import React from "react";
import { Password } from "primereact/password";

const PasswordField = ({
  value,
  onChange,
  label,
  onBlur,
  error,
  field_name,
  containerClassName,
  fieldClassName,
}) => {
  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <label htmlFor={field_name} className="block mb-1 font-medium">
        {label}
      </label>
      <Password
        id={field_name}
        name={field_name}
        value={value}
        onChange={(e) =>
          onChange({
            target: {
              name: field_name,
              value: e.target ? e.target.value : e.value,
            },
          })
        }
        onBlur={onBlur}
        placeholder="Enter your password"
        toggleMask
        feedback={true}
        promptLabel="Choose a password"
        weakLabel="Too simple"
        mediumLabel="Average complexity"
        strongLabel="Complex password"
        className={`!w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"} ${fieldClassName}`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default PasswordField;
