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
  pageTitle: "Welcome to IntelliHire",
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
      field_name: "email",
      type: "email",
      label: "Work Email",
      placeholder: "hr@techcorp.com",
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
  pageTitle: "Welcome to IntelliHire",
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
      label: "Confirm Password",
      placeholder: "Enter your password",
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

export const candidateOnboardingConfig = {
  pageTitle: "Complete your profile",
  pageSubtitle: "Step into the future of hiring",
  submitButtonText: "Complete Registration",
  hideSocial: true,
  fields: [
    {
      field_name: "Photo",
      type: "upload",
      uploadType: "image",
      label: "Profile picture",
    },
    {
      field_name: "CV",
      type: "upload",
      uploadType: "file",
      label: "Upload CV",
      placeholder: "Click to upload CV",
      validation: {
        required: true,
        message: "CV is required",
      },
    },
    {
      field_name: "PhoneNumber",
      type: "phone",
      label: "Phone Number",
      placeholder: "Enter Your Phone Number",
      validation: {
        required: true,
        pattern: "^(\\+2)?01[0125][0-9]{8}$",
        message: {
          required: "phone number is required",
          pattern: "phone number is invalid",
        },
      },
    },
  ],
};

export const companyOnboardingConfig = {
  info: {
    pageTitle: "Company Info",
    pageSubtitle: "Let's get to know your organization better",
    submitButtonText: "Continue",
    hideSocial: true,
    fields: [
      {
        field_name: "Name",
        type: "text",
        label: "Company Name",
        placeholder: "Tech Corp",
        validation: { required: true },
      },
      {
        field_name: "Industry",
        type: "select",
        label: "Industry",
        placeholder: "Select Industry",
        options: [
          { label: "Software", value: "Software" },
          { label: "Hardware", value: "Hardware" },
          { label: "Finance", value: "Finance" },
          { label: "Healthcare", value: "Healthcare" },
          { label: "Education", value: "Education" },
        ],
        validation: { required: true },
      },
      {
        field_name: "PhoneNumber",
        type: "phone",
        label: "Phone Number",
        placeholder: "Enter Your Phone Number",
        validation: {
          required: true,
          pattern: "^(\\+2)?01[0125][0-9]{8}$",
          message: {
            required: "phone number is required",
            pattern: "phone number is invalid",
          },
        },
      },
    ],
  },
  details: {
    pageTitle: "Company Details",
    pageSubtitle: "Add more details about your company",
    submitButtonText: "Continue",
    hideSocial: true,
    fields: [
      {
        field_name: "CompanyLogo",
        type: "upload",
        uploadType: "image",
        label: "Company Logo",
      },
      {
        field_name: "WebsiteUrl",
        type: "text",
        label: "Website URL",
        placeholder: "https://example.com",
        validation: { pattern: "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$" },
      },
      {
        field_name: "About",
        type: "text",
        label: "About Company",
        placeholder: "Brief description...",
      },
    ],
  },
  location: {
    pageTitle: "Location",
    pageSubtitle: "Where is your company headquarters located?",
    submitButtonText: "Complete Profile",
    hideSocial: true,
    fields: [
      {
        field_name: "Locations.Country",
        type: "select",
        label: "Country",
        placeholder: "Select Country",
        options: getAllCountries(),
        onValueChange: (val, { setFieldValue }) => {
          setFieldValue("Locations.Government", "");
          setFieldValue("Locations.City", "");
        },
        validation: { required: true },
      },
      {
        field_name: "Locations.Government",
        type: "select",
        label: "Governorate",
        placeholder: "Select Governorate",
        options: (values) => getStatesOfCountry(get(values, "Locations.Country")),
        onValueChange: (val, { setFieldValue }) => {
          setFieldValue("Locations.City", "");
        },
        validation: { required: true },
      },
      {
        field_name: "Locations.City",
        type: "text",
        label: "Detailed Address",
        placeholder: "e.g. Building 4, Street 9, Maadi",
        validation: { required: true },
      },
    ],
  },
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
