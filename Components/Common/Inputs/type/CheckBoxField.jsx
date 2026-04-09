import { get } from "lodash-es";
import { Checkbox } from "primereact/checkbox";

const CheckBoxField = (props) => {
  const value = get(props, "value");
  const onChange = get(props, "onChange");
  const onBlur = get(props, "onBlur");
  const label = get(props, "label");
  const containerClassName = get(props, "containerClassName", "");
  const error = get(props, "error");
  const field_name = get(props, "field_name");
  const fieldClassName = get(props, "fieldClassName", "");

  const handleChange = (e) => {
    const isChecked = get(e, "checked");
    if (onChange) {
      onChange({
        target: {
          name: field_name,
          type: "checkbox",
          checked: isChecked,
        },
      });
    }
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
