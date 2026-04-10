import { get } from "lodash-es";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import MainText from "../../MainText";

const PasswordField = (props) => {
  const value = get(props, "value");
  const onChange = get(props, "onChange");
  const label = get(props, "label");
  const onBlur = get(props, "onBlur");
  const error = get(props, "error");
  const field_name = get(props, "field_name");
  const containerClassName = get(props, "containerClassName", "");
  const fieldClassName = get(props, "fieldClassName", "");

  const footer = (
    <>
      <Divider />
      <MainText title="Suggestions" className="mt-2 text-sm font-semibold" />
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <label htmlFor={field_name} className="block mb-1 font-medium">
        {label}
      </label>
      <div className="w-full">
        <Password
          id={field_name}
          name={field_name}
          value={value}
          onChange={(e) => {
            const target = get(e, "target");
            const eventValue = get(e, "value");
            const newValue = target ? get(target, "value") : eventValue;
            if (onChange) {
              onChange({
                target: {
                  name: field_name,
                  value: newValue,
                },
              });
            }
          }}
          footer={footer}
          onBlur={onBlur}
          placeholder="Enter your password"
          toggleMask
          feedback={true}
          promptLabel="Pick a password"
          weakLabel="Too simple"
          mediumLabel="Average complexity"
          strongLabel="Complex password"
          inputClassName={`!w-full p-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          } ${fieldClassName}`}
          className={`w-full`}
          panelClassName="password-panel"
          style={{ width: "100%" }}
          inputStyle={{ width: "100%" }}
        />
        {error && <small className="text-red-500 block mt-1">{error}</small>}
      </div>
    </div>
  );
};

export default PasswordField;
