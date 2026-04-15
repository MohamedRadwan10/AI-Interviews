import { get } from "lodash-es";
import { Dropdown } from "primereact/dropdown";

const SelectField = (props) => {
  const field_name = get(props, "field_name");
  const value = get(props, "value", "");
  const onChange = get(props, "onChange");
  const onBlur = get(props, "onBlur");
  const label = get(props, "label");
  const placeholder = get(props, "placeholder", "Select an option");
  const options = get(props, "options", []);
  const error = get(props, "error");
  const containerClassName = get(props, "containerClassName", "");
  const fieldClassName = get(props, "fieldClassName", "");

  const handleChange = (e) => {
    if (onChange) {
      onChange({
        target: {
          name: field_name,
          value: e.value,
        },
      });
    }
  };

  return (
    <div className={`w-full mb-2 ${containerClassName}`}>
      {label && (
        <label htmlFor={field_name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <Dropdown
        id={field_name}
        name={field_name}
        value={value}
        options={options}
        optionLabel="label"
        optionValue="value"
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        filter
        filterBy="label"
        resetFilterOnHide
        className={`w-full h-full border rounded transition-all duration-200 ${
          error ? "border-status-error" : "border-ui-borderLight"
        } ${fieldClassName}`}
        pt={{
          root: { className: "flex items-center" },
          input: { 
            className: `p-2 text-light-black dark:text-dark-white !bg-transparent ${!value ? "opacity-50" : "opacity-100"}` 
          },
          trigger: { className: "text-light-black dark:text-dark-white px-2" },
          item: { 
            className: "text-light-black dark:text-dark-white hover:!bg-light-secondary/20 dark:hover:!bg-dark-primary-2 cursor-pointer p-2 m-1 rounded transition-colors" 
          },
          panel: { className: "bg-light-primary dark:bg-dark-primary-1 border border-ui-borderLight dark:border-ui-border shadow-lg rounded-lg" },
          header: { className: "bg-light-primary dark:bg-dark-primary-1 border-b border-ui-borderLight dark:border-ui-border p-2" },
          filterInput: { className: "p-2 bg-light-primary dark:bg-dark-primary-3 text-light-black dark:text-dark-white border border-ui-borderLight dark:border-ui-border rounded w-full" },
          emptyMessage: { className: "p-3 text-light-black dark:text-dark-white opacity-60" }
        }}
        invalid={!!error}
      />
      {error && <small className="text-status-error">{error}</small>}
    </div>
  );
};

export default SelectField;
