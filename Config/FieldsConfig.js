import { getAllCountries, getStatesOfCountry, getCitiesOfState } from "@/Utils/Func/LocationData";
import { get } from "lodash-es";

export const loginConfig = {
  pageTitle: "Welcome back to IntelliHire",
  pageSubtitle: "Step into the future of hiring",
  submitButtonText: "Sign In",

  footerText: "Don't have account?",
  footerLinks: [
    {
      text: "Register",
      href: "/account-type",
      type: "register",
    },
    {
      text: "Forgot password ?",
      href: "/forget-password",
      type: "forget",
    },
  ],
  footerSeparator: "|",

  fields: [
    {
      field_name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        type: "email",
        message: "Please enter a valid email",
      },
    },
    {
      field_name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Your password",
      fieldClassName:
        "w-[100%] mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName:
        "flex flex-col gap-1 !w-full text-light-black dark:text-dark-white",
      validation: {
        required: true,
        min: 8,
        matches: [
          {
            regex: "/^[A-Z]/",
            message: "Password must start with an uppercase letter",
          },
          {
            regex: "/[a-z]/",
            message: "Password must contain at least one lowercase letter",
          },
          {
            regex: "/[0-9]/",
            message: "Password must contain at least one number",
          },
        ],
      },
    },
  ],
};

export const companyRegisterConfig = {
  pageTitle: "Register your company",
  pageSubtitle: "Connect with the best tech talent",
  submitButtonText: "Register Company",

  footerText: "Already have account?",
  footerLinks: [
    {
      text: "Log in",
      href: "/login",
    },
  ],
  footerSeparator: "",

  fields: [
    {
      field_name: "name",
      type: "text",
      label: "Company Name",
      placeholder: "Enter company name",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "Company name is required",
      },
    },
    {
      field_name: "email",
      type: "email",
      label: "Business Email",
      placeholder: "company@example.com",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        type: "email",
        message: "Valid business email is required",
      },
    },
    {
      field_name: "websiteUrl",
      type: "text",
      label: "Website URL",
      placeholder: "https://www.company.com",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "Website URL is required",
      },
    },
    {
      field_name: "industry",
      type: "text",
      label: "Industry",
      placeholder: "e.g. Software, Finance",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "Industry is required",
      },
    },
    {
      field_name: "phoneNumbers",
      type: "text",
      label: "Phone Numbers",
      placeholder: "Enter phone numbers",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "Phone number is required",
      },
    },
    {
      field_name: "locations.country",
      type: "select",
      label: "Country",
      placeholder: "Select country",
      options: getAllCountries(),
      onValueChange: (val, { setFieldValue }) => {
        setFieldValue("locations.government", "");
        setFieldValue("locations.city", "");
      },
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "Country is required",
      },
    },
    {
      field_name: "locations.government",
      type: "select",
      label: "Government",
      placeholder: "Select government/state",
      options: (values) => getStatesOfCountry(get(values, "locations.country")),
      onValueChange: (val, { setFieldValue }) => {
        setFieldValue("locations.city", "");
      },
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "Government is required",
      },
    },
    {
      field_name: "locations.city",
      type: "select",
      label: "City",
      placeholder: "Select city",
      options: (values) => getCitiesOfState(get(values, "locations.country"), get(values, "locations.government")),
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        message: "City is required",
      },
    },
    {
      field_name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        min: 8,
        matches: [
          {
            regex: "^[A-Z]",
            message: "Password must start with an uppercase letter",
          },
          {
            regex: "[a-z]",
            message: "Password must contain at least one lowercase letter",
          },
          {
            regex: "[0-9]",
            message: "Password must contain at least one number",
          },
        ],
      },
    },
    {
      field_name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        min: 8,
        oneOf: {
          ref: "password",
          message: "Password and Confirm Password do not match",
        },
      },
    },
  ],
};

export const registerConfig = {
  pageTitle: "Create your account",
  pageSubtitle: "Step into the future of hiring",
  submitButtonText: "Create Account",

  footerText: "Already have account?",
  footerLinks: [
    {
      text: "Log in",
      href: "/login",
    },
  ],
  footerSeparator: "",

  fields: [
    {
      field_name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Mohamed Mahmoud",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        min: 3,
        max: 16,
        message: {
          required: "name is required",
          min: "name minLength is 3",
          max: "name maxLength is 16",
        },
      },
    },
    {
      field_name: "email",
      type: "email",
      label: "Email",
      placeholder: "Mohamed@gmail.com",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        type: "email",
        message: {
          required: "email is required",
          type: "email is invalid",
        },
      },
    },
    {
      field_name: "phoneNumber",
      type: "phone",
      label: "Phone Number",
      placeholder: "Enter Your Phone Number",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      maxLength: 11,
      numeric: true,
      validation: {
        required: true,
        pattern: "^(\\+2)?01[0125][0-9]{8}$",
        message: {
          required: "phone number is required",
          pattern: "phone number is invalid",
        },
      },
    },
    {
      field_name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Your password",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        min: 8,
        matches: [
          {
            regex: "^[A-Z]",
            message: "Password must start with an uppercase letter",
          },
          {
            regex: "[a-z]",
            message: "Password must contain at least one lowercase letter",
          },
          {
            regex: "[0-9]",
            message: "Password must contain at least one number",
          },
        ],
      },
    },
    {
      field_name: "confirmPassword",
      type: "password",
      label: "Re-enter Password",
      placeholder: "Re-enter your password",
      fieldClassName:
        "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      validation: {
        required: true,
        min: 8,
        matches: [
          {
            regex: "^[A-Z]",
            message: "Password must start with an uppercase letter",
          },
          {
            regex: "[a-z]",
            message: "Password must contain at least one lowercase letter",
          },
          {
            regex: "[0-9]",
            message: "Password must contain at least one number",
          },
        ],
        oneOf: {
          ref: "password",
          message: "Password and Confirm Password do not match",
        },
      },
    },
    // {
    //   field_name: "checkBox",
    //   type: "checkBox",
    //   label: "I agree to the Terms and Privacy Policy.",
    //   fieldClassName:
    //     "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    //   containerClassName:
    //     "flex items-center gap-2 text-light-black dark:text-dark-white",
    //   validation: {
    //     required: true,
    //     oneOf: {
    //       values: [true],
    //       message: "You must agree to the Terms and Privacy Policy.",
    //     },
    //   },
    // },
  ],
};

export const forgetPasswordConfig = {
  emailStep: {
    pageTitle: "Forget Your Password ?",
    pageSubtitle: "Enter the email address associated with your account.",
    submitButtonText: "Reset Password",
    footerLinks: [{ text: "Back to Login", href: "/login" }],
    fields: [
      {
        field_name: "email",
        type: "email",
        label: "Email",
        placeholder: "Mohamed@gmail.com",
        fieldClassName: "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
        containerClassName: "text-light-black dark:text-dark-white",
        validation: { required: true, type: "email", message: "Please enter a valid email" },
      },
    ],
  },
  otpStep: {
    pageTitle: "Get Your Code",
    pageSubtitle: "Please enter the 6-digit code that sent to your email address",
    submitButtonText: "Continue",
    footerText: "Didn't get OTP?",
    footerLinks: [{ text: "Resend OTP", href: "#", type: "resend" }],
  },
  passwordStep: {
    pageTitle: "Enter New Password",
    pageSubtitle: "Your new password must be different from previously used password",
    submitButtonText: "Reset Password",
    footerLinks: [{ text: "Cancel", href: "/login" }],
    fields: [
      {
        field_name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter Your password",
        fieldClassName: "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
        containerClassName: "text-light-black dark:text-dark-white",
        validation: { required: true, min: 8 },
      },
      {
        field_name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: "Enter Your password",
        fieldClassName: "dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
        containerClassName: "text-light-black dark:text-dark-white",
        validation: { required: true, oneOf: { ref: "password", message: "Passwords do not match" } },
      },
    ],
  },
};
