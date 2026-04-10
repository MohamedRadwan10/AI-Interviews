import { get } from "lodash-es";
import { InputText } from "primereact/inputtext";

const TextField = (props) => {
  const field_name = get(props, "field_name");
  const value = get(props, "value", "");
  const onChange = get(props, "onChange");
  const onBlur = get(props, "onBlur");
  const label = get(props, "label");
  const placeholder = get(props, "placeholder", "Enter text");
  const error = get(props, "error");
  const containerClassName = get(props, "containerClassName", "");
  const fieldClassName = get(props, "fieldClassName", "");

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      {label && (
        <label htmlFor={field_name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <InputText
        id={field_name}
        name={field_name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } ${fieldClassName}`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default TextField;
