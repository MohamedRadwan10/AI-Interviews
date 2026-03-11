import React from "react";
import { Checkbox } from "primereact/checkbox";

const CheckBoxField = ({
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
    onChange({
      target: {
        name: field_name,
        type: "checkbox",
        checked: e.checked,
      },
    });
  };

  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <div className="flex items-center gap-2">
        <Checkbox
          inputId={field_name}
          name={field_name}
          checked={value || false}
          onChange={handleChange}
          onBlur={onBlur}
          className={fieldClassName}
          invalid={!!error}
        />
        <label htmlFor={field_name} className="cursor-pointer">
          {label}
        </label>
      </div>
      {error && <small className="text-red-500 block mt-1">{error}</small>}
    </div>
  );
};

export default CheckBoxField;
