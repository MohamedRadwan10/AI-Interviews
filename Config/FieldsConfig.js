export const loginConfig = {
  pageTitle: "Welcome back to IntelliHire",
  pageSubtitle: "Step into the future of hiring",
  submitButtonText: "Sign In",

  footerText: "Don't have account?",
  footerLinks: [
    {
      text: "Candidate",
      href: "/candidate-register",
      type: "candidate",
    },
    {
      text: "Company",
      href: "/company-register",
      type: "company",
    },
  ],
  footerSeparator: "or",

  fields: [
    {
      field_name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      fieldClassName:
        "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
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
        "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
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
        "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
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
      field_name: "phone",
      type: "phone",
      label: "Phone Number",
      placeholder: "Enter Your Phone Number",
      fieldClassName:
        "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
      containerClassName: "text-light-black dark:text-dark-white",
      maxLength: 11,
      numeric: true,
      validation: {
        required: true,
        pattern: "^(\\+2)?01[0125][0-9]{8}$",
        message: {
          required: "phone is required",
          pattern: "phone is invalid",
        },
      },
    },
    {
      field_name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Your password",
      fieldClassName:
        "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
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
      field_name: "rePassword",
      type: "password",
      label: "Re-enter Password",
      placeholder: "Re-enter your password",
      fieldClassName:
        "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
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
          message: "Password and Re-password do not match",
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
