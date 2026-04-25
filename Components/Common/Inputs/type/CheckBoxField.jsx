import { get } from "lodash-es";
import { Checkbox } from "primereact/checkbox";
import MainText from "@/Components/Common/MainText";

const CheckBoxField = (props) => {
  const { field_name, value = false, onChange, onBlur, label, error, containerClassName = "", fieldClassName = "", validation } = props;
  const isRequired = get(validation, "required");

  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <div className="flex items-center gap-2">
        <Checkbox
          inputId={field_name}
          name={field_name}
          checked={value}
          onChange={(e) => onChange?.({ target: { name: field_name, checked: e.checked } })}
          onBlur={onBlur}
          className={fieldClassName}
        />
        <div className="flex items-center gap-1">
          {label && <MainText tag="label" htmlFor={field_name} title={label} className="cursor-pointer font-medium text-ui-textMuted dark:text-dark-gray text-sm" />}
          {isRequired && <span className="text-status-error text-xs">*</span>}
        </div>
      </div>
      {error && <MainText title={error} className="text-status-error text-[10px] mt-1" />}
    </div>
  );
};

export default CheckBoxField;
