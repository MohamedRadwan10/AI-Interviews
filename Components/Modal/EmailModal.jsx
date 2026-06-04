"use client";
import React, { useState, useCallback } from "react";
import CommonModal from "@/Components/Common/CommonModal";
import { EmailStep1, EmailStep2, EmailStep3 } from "@/Components/Settings/Steps/ChangeEmail";

const EmailModal = ({
  emailModalOpen,
  handleCloseEmailModal,
  emailStep,
  handleEmailStep1,
  email1Loading,
  handleEmailStep2,
  email2Loading,
  handleEmailStep3,
  email3Loading,
  handleResendEmailOtp
}) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = useCallback((value) => {
    setOtp(value);
    const cleanedValue = value ? String(value).trim() : "";
    if (cleanedValue.length === 6) {
      handleEmailStep3(cleanedValue);
    }
  }, [handleEmailStep3]);

  const handleOtpSubmit = useCallback(() => {
    handleEmailStep3(otp);
  }, [handleEmailStep3, otp]);

  return (
    <CommonModal 
      visible={emailModalOpen} 
      onHide={handleCloseEmailModal} 
      header={emailStep === 3 ? "" : "Change email address"} 
      width={emailStep === 3 ? "500px" : "450px"}
    >
      {emailStep === 1 && (
        <EmailStep1 
          onSubmit={handleEmailStep1} 
          onCancel={handleCloseEmailModal} 
        />
      )}

      {emailStep === 2 && (
        <EmailStep2 
          onSubmit={handleEmailStep2} 
          onCancel={handleCloseEmailModal} 
          email1Loading={email1Loading}
          email2Loading={email2Loading}
        />
      )}

      {emailStep === 3 && (
        <EmailStep3 
          otp={otp} 
          onOtpChange={handleOtpChange} 
          onSubmit={handleOtpSubmit} 
          email3Loading={email3Loading} 
          onResend={handleResendEmailOtp}
        />
      )}
    </CommonModal>
  );
};

export default EmailModal;

