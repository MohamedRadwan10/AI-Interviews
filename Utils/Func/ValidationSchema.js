import * as Yup from "yup";
import { set } from "lodash-es";

export const buildValidationSchema = (fields) => {
  const shapeConfig = {};

  fields.forEach((field) => {
    let schema = field.type === "upload" ? Yup.mixed() : Yup.string();

    if (field.validation) {
      const messages = field.validation.message || {};

      if (field.validation.required) {
        schema = schema.required(
          typeof messages === "object" ? messages.required : messages,
        );
      }

      if (field.validation.type === "email") {
        schema = schema.email(
          typeof messages === "object" ? messages.type : messages,
        );
      }

      if (field.validation.min) {
        schema = schema.min(
          field.validation.min,
          typeof messages === "object" ? messages.min : messages,
        );
      }

      if (field.validation.max) {
        schema = schema.max(
          field.validation.max,
          typeof messages === "object" ? messages.max : messages,
        );
      }

      if (field.validation.matches) {
        field.validation.matches.forEach((rule) => {
          let regexPattern = rule.regex;
          if (typeof regexPattern === "string") {
            regexPattern = regexPattern.replace(/^\/|\/$/g, "");
          }

          schema = schema.test("matches", rule.message, (value) => {
            if (!value) return true; // Let required handle empty values
            try {
              const regex = new RegExp(regexPattern);
              return regex.test(value);
            } catch (e) {
              console.error("Invalid regex pattern:", regexPattern, e);
              return false;
            }
          });
        });
      }

      if (field.validation.pattern) {
        let pattern = field.validation.pattern;
        if (typeof pattern === "string") {
          pattern = pattern.replace(/^\/|\/$/g, "");
        }

        schema = schema.matches(
          pattern,
          typeof messages === "object" ? messages.pattern : messages,
        );
      }

      if (field.type === "checkBox") {
        schema = Yup.boolean();
      }

      if (field.validation.oneOf) {
        if (field.validation.oneOf.values) {
          schema = schema.oneOf(
            field.validation.oneOf.values,
            field.validation.oneOf.message,
          );
        } else if (field.validation.oneOf.ref) {
          schema = schema.oneOf(
            [Yup.ref(field.validation.oneOf.ref)],
            field.validation.oneOf.message,
          );
        }
      }

      if (field.validation.customTest) {
        schema = schema.test(
          field.validation.customTest.name,
          field.validation.customTest.message,
          function(value) {
            return field.validation.customTest.test(value, this);
          }
        );
      }
    }

    set(shapeConfig, field.field_name, schema);
  });

  const convertToYup = (obj) => {
    if (obj instanceof Yup.Schema) {
      return obj;
    }
    const nestedShape = {};
    for (const key in obj) {
      nestedShape[key] = convertToYup(obj[key]);
    }
    return Yup.object().shape(nestedShape);
  };

  return convertToYup(shapeConfig);
};
