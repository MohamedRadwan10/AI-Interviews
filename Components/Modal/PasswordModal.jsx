"use client";
import React, { useState, useCallback } from "react";
import CommonModal from "@/Components/Common/CommonModal";
import { PasswordStep1, PasswordStep2, PasswordStep3 } from "@/Components/Settings/Steps/ChangePassword";

const PasswordModal = ({
  passwordModalOpen,
  handleClosePasswordModal,
  passwordStep,
  pass1Loading,
  pass2Loading,
  pass3Loading,
  handlePasswordStep1,
  handlePasswordStep2,
  handlePasswordStep3,
  passwordInitialValues,
  passwordSchema
}) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = useCallback((value) => {
    setOtp(value);
    const cleanedValue = value ? String(value).trim() : "";
    if (cleanedValue.length === 6) {
      handlePasswordStep2(cleanedValue);
    }
  }, [handlePasswordStep2]);

  const handleOtpSubmit = useCallback(() => {
    handlePasswordStep2(otp);
  }, [handlePasswordStep2, otp]);

  return (
    <CommonModal 
      visible={passwordModalOpen} 
      onHide={handleClosePasswordModal} 
      header={passwordStep === 2 ? "" : "Change password"} 
      width={passwordStep === 2 ? "500px" : "450px"}
    >
      {passwordStep === 1 && (
        <PasswordStep1 
          pass1Loading={pass1Loading} 
        />
      )}
      
      {passwordStep === 2 && (
        <PasswordStep2 
          otp={otp} 
          onOtpChange={handleOtpChange} 
          onSubmit={handleOtpSubmit} 
          pass2Loading={pass2Loading} 
          onResend={handlePasswordStep1}
        />
      )}

      {passwordStep === 3 && (
        <PasswordStep3 
          onSubmit={handlePasswordStep3} 
          onCancel={handleClosePasswordModal} 
          pass3Loading={pass3Loading} 
          passwordInitialValues={passwordInitialValues} 
          passwordSchema={passwordSchema} 
        />
      )}
    </CommonModal>
  );
};

export default PasswordModal;

