import { get } from "lodash-es";
import { InputText } from "primereact/inputtext";
import MainText from "@/Components/Common/MainText";

const PhoneField = (props) => {
  const { field_name, value = "", onChange, onBlur, label, placeholder = "Enter your phone number", error, containerClassName = "", fieldClassName = "", validation } = props;
  const isRequired = get(validation, "required");

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <div className="flex items-center gap-1 mb-1">
        {label && <MainText tag="label" title={label} className="font-medium text-ui-textMuted dark:text-dark-gray text-sm" />}
        {isRequired && <span className="text-status-error text-xs">*</span>}
      </div>
      <InputText
        id={field_name}
        name={field_name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={11}
        className={`w-full p-2 border rounded outline-none focus:border-brand-primary transition-all bg-light-blue50 dark:bg-dark-primary-3 ${
          error ? "border-status-error" : "border-ui-borderLight dark:border-dark-gray"
        } ${fieldClassName}`}
      />
      {error && <MainText title={error} className="text-status-error text-[10px] mt-1" />}
    </div>
  );
};

export default PhoneField;
