import { get } from "lodash-es";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import MainText from "@/Components/Common/MainText";

const PasswordField = (props) => {
  const { field_name, value = "", onChange, onBlur, label, placeholder = "Enter your password", error, containerClassName = "", fieldClassName = "", validation } = props;
  const isRequired = get(validation, "required");

  const footer = (
    <>
      <Divider />
      <MainText title="Suggestions" className="mt-2 text-sm font-semibold" />
      <ul className="pl-2 ml-2 mt-0 text-xs">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <div className="flex items-center gap-1 mb-1">
        {label && <MainText tag="label" title={label} className="font-medium text-ui-textMuted dark:text-dark-gray text-sm" />}
        {isRequired && <span className="text-status-error text-xs">*</span>}
      </div>
      <Password
        id={field_name}
        name={field_name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        footer={footer}
        placeholder={placeholder}
        toggleMask
        feedback={true}
        inputClassName={`!w-full p-2 border rounded outline-none focus:border-brand-primary transition-all bg-light-blue50 dark:bg-dark-primary-3 ${
          error ? "border-status-error" : "border-ui-borderLight dark:border-dark-gray"
        } ${fieldClassName}`}
        className="w-full"
        style={{ width: "100%" }}
      />
      {error && <MainText title={error} className="text-status-error text-[10px] mt-1" />}
    </div>
  );
};

export default PasswordField;
