export const candidatePersonalConfig = {
  fields: [
    {
      field_name: "Photo",
      type: "photoUpload",
      uploadType: "image",
      label: "Upload Photo",
      // placeholder: "JPG or PNG, Max size 2MB",
      containerClassName: "w-24 h-24 rounded-full overflow-hidden"
    },
    {
      field_name: "FullName",
      type: "text",
      label: "Full Name",
      placeholder: "e.g. Mohamed",
      validation: {
        required: true,
        min: 3,
        message: "Full Name must be at least 3 characters"
      }
    },
    {
      field_name: "PhoneNumber",
      type: "phone",
      label: "Phone Number",
      placeholder: "e.g. 0123456789",
      validation: {
        required: true,
        pattern: "^(\\+2)?01[0125][0-9]{8}$",
        message: "Invalid Egyptian phone number"
      }
    }
  ]
};

export const candidateResumeConfig = {
  fields: [
    {
      field_name: "CvFile",
      type: "upload",
      uploadType: "file",
      label: "Upload New Resume",
      placeholder: "Click to upload or drag and drop PDF or Word document (max. 5MB)",
      validation: {
        required: true,
        message: "Resume file is required"
      }
    }
  ]
};

export const changeEmailConfig = {
  fields: [
    {
      field_name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter new email address",
      validation: {
        required: true,
        type: "email",
        message: "Please enter a valid email"
      }
    },
    {
      field_name: "currentPassword",
      type: "password",
      label: "Current Password",
      placeholder: "Enter current password",
      validation: {
        required: true,
        message: "Password is required to request email change"
      }
    }
  ]
};

export const changePasswordConfig = {
  fields: [
    {
      field_name: "currentPassword",
      type: "password",
      label: "Current Password",
      placeholder: "Enter current password",
      validation: {
        required: true,
        message: "Current password is required"
      }
    },
    {
      field_name: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "Enter new password",
      validation: {
        required: true,
        min: 8,
        matches: [
          { regex: "^[A-Z]", message: "Password must start with uppercase letter" },
          { regex: "[a-z]", message: "Password must contain lowercase letter" },
          { regex: "[0-9]", message: "Password must contain a number" }
        ]
      }
    },
    {
      field_name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm new password",
      validation: {
        required: true,
        oneOf: { ref: "newPassword", message: "Passwords do not match" }
      }
    }
  ]
};
