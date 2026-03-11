import React from "react";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";

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
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
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
        footer={footer}
        onBlur={onBlur}
        placeholder="Enter your password"
        toggleMask
        feedback={true}
        promptLabel="Pick a password"
        weakLabel="Too simple"
        mediumLabel="Average complexity"
        strongLabel="Complex password"
        inputClassName={`!w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"} ${fieldClassName}`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default PasswordField;
