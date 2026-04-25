import { get } from "lodash-es";
import { Calendar } from "primereact/calendar";
import MainText from "@/Components/Common/MainText";

const DateField = (props) => {
  const { 
    field_name, 
    value, 
    onChange, 
    onBlur, 
    label, 
    placeholder = "Select Date", 
    error, 
    containerClassName = "", 
    fieldClassName = "", 
    validation 
  } = props;
  
  const isRequired = get(validation, "required");

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      <div className="flex items-center gap-1 mb-1">
        {label && <MainText tag="label" title={label} className="font-medium text-ui-textMuted dark:text-dark-gray text-sm" />}
        {isRequired && <span className="text-status-error text-xs">*</span>}
      </div>
      <Calendar
        id={field_name}
        name={field_name}
        value={value ? (value instanceof Date ? value : new Date(value)) : null}
        onChange={(e) => {
          onChange(e.value);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        showIcon
        dateFormat="yy-mm-dd"
        className={`w-full ${fieldClassName}`}
        inputClassName={`w-full p-2 border rounded outline-none focus:border-brand-primary transition-all bg-light-blue50 dark:bg-dark-primary-3 ${
          error ? "border-status-error" : "border-ui-borderLight dark:border-dark-gray"
        }`}
      />
      {error && <MainText title={error} className="text-status-error text-[10px] mt-1" />}
    </div>
  );
};

export default DateField;
