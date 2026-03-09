import * as Yup from "yup";

export const buildValidationSchema = (formConfig) => {
  const shape = formConfig.reduce((acc, field) => {
    let schema = Yup.string();

    if (field.validation) {
      if (field.validation.required)
        schema = schema.required(field.validation.message);
      if (field.validation.type === "email")
        schema = schema.email(field.validation.message);
      if (field.validation.min)
        schema = schema.min(field.validation.min, field.validation.message);
      if (field.validation.max)
        schema = schema.max(field.validation.max, field.validation.message);
    }

    acc[field.field_name] = schema;
    return acc;
  }, {});

  return Yup.object().shape(shape);
};
