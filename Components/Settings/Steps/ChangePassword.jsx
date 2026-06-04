"use client";
import React from "react";
import { Formik, Form } from "formik";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { OTPStep } from "@/Components/Pages/type/ForgetPassword/StepComponents";

const otpConfig = {
  submitButtonText: "Verify Code",
  footerText: "Didn't get OTP ?",
  footerLinks: [{ text: "Resend OTP" }]
};

export const PasswordStep1 = ({ pass1Loading }) => {
  return (
    <div className="flex flex-col gap-4 mt-2 items-center py-8">
      <MainText title="Sending OTP verification to your email..." className="text-sm text-ui-textMain dark:text-white text-center" />
      {pass1Loading && <MainText title="Processing..." className="text-xs text-brand-primary animate-pulse" />}
    </div>
  );
};

export const PasswordStep2 = ({ otp, onOtpChange, onSubmit, pass2Loading, onResend }) => {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-2">
      <div className="flex flex-col gap-2 text-center items-center">
        <MainText title="Get Your Code" className="text-2xl font-bold text-ui-textMain dark:text-white" />
        <MainText title="Please enter the 6-digit code that we sent to your email address" className="text-sm text-ui-textMuted dark:text-ui-muted max-w-[280px]" />
      </div>

      <div className="w-full mt-4">
        <OTPStep 
          config={otpConfig} 
          otp={otp} 
          onOtpChange={onOtpChange} 
          onSubmit={onSubmit} 
          isLoading={pass2Loading} 
          onResend={onResend}
        />
      </div>
    </div>
  );
};

export const PasswordStep3 = ({ 
  onSubmit, 
  onCancel, 
  pass3Loading, 
  passwordInitialValues, 
  passwordSchema 
}) => {
  return (
    <div className="flex flex-col gap-6 mt-2">
      <div className="flex flex-col gap-1">
        <MainText title="Create a new password" className="text-sm text-ui-textMain dark:text-white" />
        <MainText title="Make sure it's at least 8 characters including a number and a lowercase letter." className="text-xs text-ui-textMuted dark:text-ui-muted" />
      </div>

      <Formik initialValues={passwordInitialValues} validationSchema={passwordSchema} onSubmit={onSubmit}>
        {({ values, errors, touched, setFieldValue, handleBlur }) => {
          const handleCurrentPasswordChange = (e) => setFieldValue("currentPassword", e.target.value);
          const handleNewPasswordChange = (e) => setFieldValue("newPassword", e.target.value);
          const handleConfirmPasswordChange = (e) => setFieldValue("confirmPassword", e.target.value);

          return (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <MainInput field_name="currentPassword" type="password" label="Current password" placeholder="Enter current password" value={values.currentPassword} error={touched.currentPassword && errors.currentPassword} onChange={handleCurrentPasswordChange} onBlur={handleBlur} />
                <MainInput field_name="newPassword" type="password" label="New password" placeholder="Enter new password" value={values.newPassword} error={touched.newPassword && errors.newPassword} onChange={handleNewPasswordChange} onBlur={handleBlur} />
                <MainInput field_name="confirmPassword" type="password" label="Confirm new password" placeholder="Confirm password" value={values.confirmPassword} error={touched.confirmPassword && errors.confirmPassword} onChange={handleConfirmPasswordChange} onBlur={handleBlur} />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <MainButton type="button" onClick={onCancel} className="px-5 py-2.5 bg-transparent text-ui-textMuted hover:text-ui-textMain font-medium transition-colors" title="Cancel" />
                <MainButton type="submit" disabled={pass3Loading} className="px-6 py-2.5 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-primaryDark transition-all disabled:opacity-50" title={pass3Loading ? "Changing..." : "Update password"} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
