import { get } from "lodash-es";
import { InputText } from "primereact/inputtext";

const EmailField = (props) => {
  const value = get(props, "value");
  const onChange = get(props, "onChange");
  const onBlur = get(props, "onBlur");
  const label = get(props, "label");
  const containerClassName = get(props, "containerClassName", "");
  const error = get(props, "error");
  const field_name = get(props, "field_name");
  const fieldClassName = get(props, "fieldClassName", "");

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <label className="block mb-1 font-medium">{label}</label>
      <InputText
        id={field_name}
        name={field_name}
        type="email"
        value={value}
        onChange={(e) => {
          const target = get(e, "target");
          const newValue = get(target, "value");
          if (onChange) {
            onChange({
              target: { name: field_name, value: newValue },
            });
          }
        }}
        onBlur={onBlur}
        placeholder="Enter your email"
        className={`w-full p-2 border rounded ${
          error ? "border-status-error" : "border-ui-borderLight"
        } ${fieldClassName}`}
      />
      {error && <small className="text-status-error">{error}</small>}
    </div>
  );
};

export default EmailField;
