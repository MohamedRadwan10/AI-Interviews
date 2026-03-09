export const loginFormConfig = [
  {
    field_name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    fieldClassName: "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
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
    placeholder: "Enter your password",
    fieldClassName: "mb-2 dark:bg-dark-primary-1 bg-light-primary border-[0.5px] dark:border-dark-gray border-light-gray",
    containerClassName: "text-light-black dark:text-dark-white",
    validation: {
      required: true,
      min: 6,
      message: "Password must be at least 6 characters",
    },
  },
];
