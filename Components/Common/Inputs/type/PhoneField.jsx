import { get } from "lodash-es";
import { InputText } from "primereact/inputtext";

const PhoneField = (props) => {
  const value = get(props, "value", "");
  const onChange = get(props, "onChange");
  const onBlur = get(props, "onBlur");
  const label = get(props, "label");
  const containerClassName = get(props, "containerClassName", "");
  const error = get(props, "error");
  const field_name = get(props, "field_name");
  const fieldClassName = get(props, "fieldClassName", "");

  const handleChange = (e) => {
    const target = get(e, "target");
    const rawValue = get(target, "value", "");
    const onlyNumbers = rawValue.replace(/\D/g, "");

    if (onChange) {
      onChange({
        target: {
          name: field_name,
          value: onlyNumbers,
        },
      });
    }
  };

  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <label htmlFor={field_name} className="block mb-1 font-medium">
        {label}
      </label>

      <InputText
        id={field_name}
        name={field_name}
        value={value}
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
