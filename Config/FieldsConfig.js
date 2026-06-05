import { getAllCountries, getStatesOfCountry, getCitiesOfState } from "@/Utils/Func/LocationData";
import { get } from "lodash-es";
import { jobCategories, jobSubCategories, jobTypes, careerLevels } from "./InterviewConfig";

export const loginConfig = {
  pageTitle: "Welcome back to IntelliHire",
  pageSubtitle: "Step into the future of hiring",
  submitButtonText: "Sign In",
  externalType: 0,


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
  externalType: 1,


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
  externalType: 0,
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
      placeholder: "Enter your name",
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
      placeholder: "Enter your email",
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

const sumQuestionsTotalTest = {
  name: "sumQuestionsLimit",
  message: "Total questions cannot be less than the sum of individual question types.",
  test: function(value, context) {
    const { questionsCount, codingCount, behavioralCount, technicalCount } = context.parent || {};
    const total = parseInt(questionsCount, 10) || 10;
    const c = parseInt(codingCount, 10) || 0;
    const b = parseInt(behavioralCount, 10) || 0;
    const t = parseInt(technicalCount, 10) || 0;
    return (c + b + t) <= total;
  }
};

const sumQuestionsSubTest = {
  name: "sumQuestionsLimit",
  message: "The sum of coding, behavioral, and technical questions cannot exceed the total questions count.",
  test: function(value, context) {
    const { questionsCount, codingCount, behavioralCount, technicalCount } = context.parent || {};
    const total = parseInt(questionsCount, 10) || 10;
    const c = parseInt(codingCount, 10) || 0;
    const b = parseInt(behavioralCount, 10) || 0;
    const t = parseInt(technicalCount, 10) || 0;
    return (c + b + t) <= total;
  }
};

export const postJobConfig = {
  pageTitle: "Create Job Post",
  pageSubtitle: "Find the perfect candidate for your organization",
  submitButtonText: "Publish Job Opportunity",
  sections: [
    {
      id: "basic",
      title: "Basic Info",
      fields: [
        {
          field_name: "title",
          type: "text",
          label: "Job Title",
          placeholder: "e.g. Senior Frontend Developer",
          validation: { required: true },
          gridClassName: "col-span-2",
        },
        {
          field_name: "category",
          type: "select",
          label: "Job Category",
          placeholder: "Select Category",
          options: jobCategories,
          validation: { required: true },
        },
        {
          field_name: "subCategory",
          type: "select",
          label: "Job Subcategory",
          placeholder: "Select Subcategory",
          options: (values) => jobSubCategories[values?.category] || [],
          validation: { required: true },
        },
        {
          field_name: "type",
          type: "select",
          label: "Job Type",
          placeholder: "Select Type",
          options: jobTypes,
          validation: { required: true },
        },
      ],
    },
    {
      id: "details",
      title: "Requirements & Level",
      fields: [
        {
          field_name: "careerLevel",
          type: "select",
          label: "Career Level",
          placeholder: "Select Level",
          options: careerLevels,
          validation: { required: true },
        },
        {
          field_name: "experienceYears",
          type: "text",
          label: "Years of Experience",
          placeholder: "e.g. 3",
          validation: { required: true },
        },
        {
          field_name: "startedAt",
          type: "date",
          label: "Posting Date",
          placeholder: "When to start?",
          validation: {},
        },
        {
          field_name: "endedAt",
          type: "date",
          label: "Application Deadline",
          placeholder: "When to end?",
          validation: { required: true },
        },
      ],
    },
    {
      id: "skills",
      title: "Core Skills",
      fields: [
        {
          field_name: "requiredSkills",
          type: "text",
          label: "Technical Skills",
          placeholder: "React, TypeScript, Node.js...",
          validation: { required: true },
          gridClassName: "col-span-2",
        },
      ],
    },
    {
      id: "description",
      title: "Job Description",
      fields: [
        {
          field_name: "description",
          type: "textarea",
          label: "The Role",
          placeholder: "Detail the responsibilities and daily tasks...",
          validation: { required: true },
          gridClassName: "col-span-2",
        },
      ],
    },
    {
      id: "requirements",
      title: "Required Qualifications",
      fields: [
        {
          field_name: "requirements",
          type: "textarea",
          label: "Qualifications",
          placeholder: "Education, certifications, or specific achievements...",
          validation: { required: true },
          gridClassName: "col-span-2",
        },
      ],
    },
    {
      id: "interviewConfig",
      title: "AI Interview Questions Configuration",
      fields: [
        {
          field_name: "questionsCount",
          type: "number",
          label: "Total Number of Questions",
          placeholder: "Leave empty for default (10)",
          validation: {
            customTest: sumQuestionsTotalTest,
          },
        },
        {
          field_name: "codingCount",
          type: "number",
          label: "Coding Questions",
          placeholder: "Leave empty to auto-distribute",
          validation: {
            customTest: sumQuestionsSubTest,
          },
        },
        {
          field_name: "behavioralCount",
          type: "number",
          label: "Behavioral Questions",
          placeholder: "Leave empty to auto-distribute",
          validation: {
            customTest: sumQuestionsSubTest,
          },
        },
        {
          field_name: "technicalCount",
          type: "number",
          label: "Technical Questions",
          placeholder: "Leave empty to auto-distribute",
          validation: {
            customTest: sumQuestionsSubTest,
          },
        },
      ],
    },
  ],
};

export const jobFilterConfig = {
  fields: [
    {
      field_name: "category",
      type: "select",
      label: "Category",
      placeholder: "All Categories",
      options: jobCategories,
      containerClassName: "!mb-0",
    },
    {
      field_name: "subCategory",
      type: "select",
      label: "Subcategory",
      placeholder: "All Subcategories",
      options: (filters) => jobSubCategories[filters.category] || [],
      disabled: (filters) => !filters.category,
      containerClassName: "!mb-0",
    },
    {
      field_name: "type",
      type: "select",
      label: "Job Type",
      placeholder: "All Types",
      options: jobTypes,
      containerClassName: "!mb-0",
    },
    {
      field_name: "careerLevel",
      type: "select",
      label: "Career Level",
      placeholder: "All Levels",
      options: careerLevels,
      containerClassName: "!mb-0",
    },
    {
      field_name: "country",
      type: "select",
      label: "Country",
      placeholder: "All Countries",
      options: getAllCountries(),
      containerClassName: "!mb-0",
    },
    {
      field_name: "city",
      type: "select",
      label: "Governorate",
      placeholder: "All Governorates",
      options: (filters) => (filters.country ? getStatesOfCountry(filters.country) : []),
      disabled: (filters) => !filters.country,
      containerClassName: "!mb-0",
    },
  ],
};
