"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { OTPStep } from "@/Components/Pages/type/ForgetPassword/StepComponents";

const passSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required")
});

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required")
});

const otpConfig = {
  submitButtonText: "Continue",
  footerText: "Didn't get OTP ?",
  footerLinks: [{ text: "Resend OTP" }]
};

export const EmailStep1 = ({ onSubmit, onCancel }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <MainText title="Confirm your identity before making changes" className="text-sm text-ui-textMain dark:text-white" />
        <MainText title="Step 1 of 2 — Confirm password" className="text-xs text-ui-textMuted dark:text-ui-muted" />
      </div>

      <Formik initialValues={{ currentPassword: "" }} validationSchema={passSchema} onSubmit={onSubmit}>
        {({ values, errors, touched, setFieldValue, handleBlur }) => {
          const handleCurrentPasswordChange = (e) => setFieldValue("currentPassword", e.target.value);

          return (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <MainInput 
                  field_name="currentPassword" 
                  type="password" 
                  label="Current password" 
                  placeholder="Enter Your password" 
                  value={values.currentPassword} 
                  error={touched.currentPassword && errors.currentPassword} 
                  onChange={handleCurrentPasswordChange} 
                  onBlur={handleBlur} 
                />
                <MainText title="We need to verify it's you before changing sensitive info." className="text-[11px] text-ui-textMuted dark:text-ui-muted" />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <MainButton type="button" onClick={onCancel} className="px-5 py-2.5 bg-transparent text-ui-textMuted hover:text-ui-textMain font-medium transition-colors" title="Cancel" />
                <MainButton type="submit" className="px-6 py-2.5 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-primaryDark transition-all" title="Continue" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export const EmailStep2 = ({ onSubmit, onCancel, email1Loading, email2Loading }) => {
  const isButtonDisabled = email1Loading || email2Loading;
  const buttonTitle = isButtonDisabled ? "Sending..." : "Send OTP";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <MainText title="Enter the new email you want to use" className="text-sm text-ui-textMain dark:text-white" />
        <MainText title="Step 2 of 2 — New email" className="text-xs text-ui-textMuted dark:text-ui-muted" />
      </div>

      <Formik initialValues={{ email: "" }} validationSchema={emailSchema} onSubmit={onSubmit}>
        {({ values, errors, touched, setFieldValue, handleBlur }) => {
          const handleEmailChange = (e) => setFieldValue("email", e.target.value);

          return (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <MainInput 
                  field_name="email" 
                  type="email" 
                  label="New email address" 
                  placeholder="Enter new email" 
                  value={values.email} 
                  error={touched.email && errors.email} 
                  onChange={handleEmailChange} 
                  onBlur={handleBlur} 
                />
                <MainText title="We'll send a OTP to confirm it's yours." className="text-[11px] text-ui-textMuted dark:text-ui-muted" />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <MainButton type="button" onClick={onCancel} className="px-5 py-2.5 bg-transparent text-ui-textMuted hover:text-ui-textMain font-medium transition-colors" title="Cancel" />
                <MainButton type="submit" disabled={isButtonDisabled} className="px-6 py-2.5 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-primaryDark transition-all disabled:opacity-50" title={buttonTitle} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export const EmailStep3 = ({ otp, onOtpChange, onSubmit, email3Loading, onResend }) => {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-2">
      <div className="flex flex-col gap-2 text-center items-center">
        <MainText title="Get Your Code" className="text-2xl font-bold text-ui-textMain dark:text-white" />
        <MainText title="Please enter the 6-digit code that we sent to your new email address" className="text-sm text-ui-textMuted dark:text-ui-muted max-w-[280px]" />
      </div>

      <div className="w-full mt-4">
        <OTPStep 
          config={otpConfig} 
          otp={otp} 
          onOtpChange={onOtpChange} 
          onSubmit={onSubmit} 
          isLoading={email3Loading} 
          onResend={onResend}
        />
      </div>
    </div>
  );
};
