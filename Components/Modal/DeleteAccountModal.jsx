"use client";
import React, { useState, useCallback } from "react";
import { Trash2 } from "lucide-react";
import CommonModal from "@/Components/Common/CommonModal";
import MainButton from "@/Components/Common/MainButton";
import MainText from "@/Components/Common/MainText";
import MainInput from "@/Components/Common/Inputs";

const DeleteAccountModal = ({
  visible,
  onHide,
  onConfirm,
  isLoading,
}) => {
  const [password, setPassword] = useState("");

  const handleConfirm = useCallback(() => {
    if (!password.trim()) return;
    onConfirm(password);
  }, [password, onConfirm]);

  const handleHide = useCallback(() => {
    setPassword("");
    onHide();
  }, [onHide]);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && password.trim()) handleConfirm();
  }, [handleConfirm, password]);

  return (
    <CommonModal
      visible={visible}
      onHide={handleHide}
      header="Delete Account"
      width="450px"
    >
      <div className="flex flex-col gap-6 p-2">
        <div className="flex items-start gap-4 p-4 bg-status-error/10 rounded-2xl border border-status-error/20">
          <Trash2 className="w-5 h-5 text-status-error mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <MainText
              title="This action cannot be undone"
              className="text-sm font-semibold text-status-error"
            />
            <MainText
              title="All your data including resume and job applications will be permanently removed."
              className="text-xs text-ui-textMuted dark:text-ui-muted leading-relaxed"
            />
          </div>
        </div>

        <div onKeyDown={handleKeyDown}>
          <MainInput
            type="password"
            field_name="delete-account-password"
            label="Enter your password to confirm"
            placeholder="Your current password"
            value={password}
            onChange={handlePasswordChange}
            feedback={false}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <MainButton
            onClick={handleHide}
            disabled={isLoading}
            className="px-5 py-2.5 bg-transparent border-2 border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted rounded-xl font-semibold hover:bg-light-primary dark:hover:bg-dark-primary-3 transition-all"
            title="Cancel"
          />
          <MainButton
            onClick={handleConfirm}
            disabled={!password.trim() || isLoading}
            isLoading={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-status-error text-white rounded-xl font-semibold hover:bg-status-error/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed border-none"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </MainButton>
        </div>
      </div>
    </CommonModal>
  );
};

export default DeleteAccountModal;
