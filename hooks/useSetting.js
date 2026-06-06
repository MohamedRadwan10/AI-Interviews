"use client";
import { useState, useCallback, useMemo, useContext } from "react";
import { useApi } from "@/hooks/useApi";
import { useMainNotify, useUrlSync } from "@/hooks/common";
import { useUserAccount } from "@/Context/UserAccountContext";
import { getVal } from "@/Utils/Func/Common";
import { get } from "lodash-es";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useLogout } from "@/hooks/useAuth";

export const useChangeEmail = (accountData, logout) => {
  const { success: notifySuccess, error: notifyError } = useMainNotify();
  
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailStep, setEmailStep] = useState(1);
  const [emailData, setEmailData] = useState({ email: "", currentPassword: "", otpToken: "" });

  const { refetch: emailStep1Api, loading: email1Loading } = useApi({ type: "ChangeEmailStep1", autoFetch: false });
  const { refetch: emailStep2Api, loading: email2Loading } = useApi({ type: "ChangeEmailStep2", autoFetch: false });
  const { refetch: emailStep3Api, loading: email3Loading } = useApi({ type: "ChangeEmailStep3", autoFetch: false });

  const handleEmailStep1 = useCallback(async (values) => {
    try {
      const currentEmail = getVal(accountData, "", "email");
      await emailStep1Api({ data: { email: currentEmail, currentPassword: values.currentPassword } });
      
      setEmailData(prev => ({ ...prev, currentPassword: values.currentPassword }));
      setEmailStep(2);
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Incorrect password or request failed");
    }
  }, [emailStep1Api, accountData, notifyError]);

  const handleEmailStep2 = useCallback(async (values) => {
    try {
      const currentEmail = getVal(accountData, "", "email");
      await emailStep2Api({ data: { currentEmail, newEmail: values.email } });
      
      setEmailData(prev => ({ ...prev, email: values.email }));
      setEmailStep(3);
      notifySuccess("Success", "Verification code sent to your new email.");
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to send code");
    }
  }, [emailStep2Api, accountData, notifySuccess, notifyError]);

  const handleEmailStep3 = useCallback(async (otpToken) => {
    try {
      const currentEmail = getVal(accountData, "", "email");
      await emailStep3Api({ data: { currentEmail, newEmail: emailData.email, otpToken } });
      
      notifySuccess("Success", "Email changed successfully! Please log in again.");
      setEmailModalOpen(false);
      setEmailStep(1);
      if (logout) logout();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "OTP confirmation failed");
    }
  }, [emailStep3Api, emailData.email, accountData, notifySuccess, notifyError, logout]);

  const handleResendEmailOtp = useCallback(async () => {
    if (!emailData.email) return;
    try {
      const currentEmail = getVal(accountData, "", "email");
      await emailStep2Api({ data: { currentEmail, newEmail: emailData.email } });
      notifySuccess("Success", "Verification code resent to your new email.");
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to resend code");
    }
  }, [emailStep2Api, accountData, emailData.email, notifySuccess, notifyError]);

  return useMemo(() => ({
    emailModalOpen, setEmailModalOpen, emailStep, setEmailStep,
    email1Loading, email2Loading, email3Loading,
    handleEmailStep1, handleEmailStep2, handleEmailStep3, handleResendEmailOtp
  }), [
    emailModalOpen, emailStep, email1Loading, email2Loading, email3Loading,
    handleEmailStep1, handleEmailStep2, handleEmailStep3, handleResendEmailOtp
  ]);
};

export const useChangePassword = (accountData) => {
  const { success: notifySuccess, error: notifyError } = useMainNotify();
  
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordStep, setPasswordStep] = useState(1);
  const [passwordOtp, setPasswordOtp] = useState("");

  const { refetch: passwordStep1Api, loading: pass1Loading } = useApi({ type: "ChangePasswordStep1", autoFetch: false });
  const { refetch: passwordStep2Api, loading: pass2Loading } = useApi({ type: "ChangePasswordStep2", autoFetch: false });
  const { refetch: passwordStep3Api, loading: pass3Loading } = useApi({ type: "ChangePasswordStep3", autoFetch: false });

  const handlePasswordStep1 = useCallback(async () => {
    try {
      await passwordStep1Api({ data: { email: getVal(accountData, "", "email") } });
      setPasswordStep(2);
      notifySuccess("Success", "OTP sent to your email.");
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Request failed");
    }
  }, [passwordStep1Api, accountData, notifySuccess, notifyError]);

  const handlePasswordStep2 = useCallback(async (code) => {
    try {
      const response = await passwordStep2Api({ data: { email: getVal(accountData, "", "email"), code } });
      const actualToken = get(response, "data.token") || get(response, "token") || code;
      
      setPasswordOtp(actualToken);
      setPasswordStep(3);
      notifySuccess("Success", "Code verified. Please set your new password.");
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Code verification failed");
    }
  }, [passwordStep2Api, accountData, notifySuccess, notifyError]);

  const handlePasswordStep3 = useCallback(async (values) => {
    try {
      await passwordStep3Api({
        data: {
          email: getVal(accountData, "", "email"),
          token: passwordOtp,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword
        }
      });
      notifySuccess("Success", "Password changed successfully!");
      setPasswordModalOpen(false);
      setPasswordStep(1);
      setPasswordOtp("");
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to change password");
    }
  }, [passwordStep3Api, accountData, passwordOtp, notifySuccess, notifyError]);

  return useMemo(() => ({
    passwordModalOpen, setPasswordModalOpen, passwordStep, setPasswordStep,
    pass1Loading, pass2Loading, pass3Loading,
    handlePasswordStep1, handlePasswordStep2, handlePasswordStep3
  }), [
    passwordModalOpen, passwordStep, pass1Loading, pass2Loading, pass3Loading,
    handlePasswordStep1, handlePasswordStep2, handlePasswordStep3
  ]);
};

export const useCandidateSettings = () => {
  const { accountData, refetch: refetchUserData } = useUserAccount();
  const { userToken } = useContext(UserTokenContext);
  const { success: notifySuccess, error: notifyError } = useMainNotify();
  const { logout } = useLogout();

  const { params, updateParam } = useUrlSync({ tab: "account" });
  const activeSection = params.tab;
  const setActiveSection = useCallback((id) => updateParam("tab", id), [updateParam]);

  const emailHook = useChangeEmail(accountData, logout);
  const passwordHook = useChangePassword(accountData);

  const { refetch: updatePersonalInfoApi, loading: infoLoading } = useApi({ type: "candidateSettingInfo", autoFetch: false });
  const { refetch: updateResumeApi, loading: cvLoading } = useApi({ type: "SettingCV", autoFetch: false });
  const { refetch: deleteAccountApi, loading: deleteLoading } = useApi({ type: "deleteAccount", autoFetch: false });

  const [pendingCvFile, setPendingCvFile] = useState(null);

  const handleUpdatePersonalInfo = useCallback(async (values) => {
    try {
      const formData = new FormData();
      if (values.Photo instanceof File) formData.append("Photo", values.Photo);
      formData.append("FullName", values.FullName || "");
      formData.append("PhoneNumber", values.PhoneNumber || "");

      await updatePersonalInfoApi({ data: formData });
      notifySuccess("Success", "Personal info updated successfully");
      refetchUserData();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to update personal info");
    }
  }, [updatePersonalInfoApi, refetchUserData, notifySuccess, notifyError]);

  const handleCvFileSelect = useCallback((file) => setPendingCvFile(file), []);
  const handleCancelCv = useCallback(() => setPendingCvFile(null), []);

  const handleSaveCv = useCallback(async () => {
    if (!pendingCvFile) return;
    try {
      const formData = new FormData();
      formData.append("CvFile", pendingCvFile);
      await updateResumeApi({ data: formData });
      notifySuccess("Success", "Resume uploaded successfully");
      setPendingCvFile(null);
      refetchUserData();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to upload resume");
    }
  }, [pendingCvFile, updateResumeApi, refetchUserData, notifySuccess, notifyError]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteAccount = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteAccountConfirm = useCallback(async (password) => {
    try {
      await deleteAccountApi({ data: { email: getVal(accountData, "", "email"), currentPassword: password } });
      notifySuccess("Account Deleted", "Your account has been successfully removed.");
      setDeleteModalOpen(false);
      logout();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to delete account");
    }
  }, [deleteAccountApi, accountData, logout, notifySuccess, notifyError]);

  const handleCloseDeleteModal = useCallback(() => setDeleteModalOpen(false), []);

  return useMemo(() => ({
    activeSection, setActiveSection, accountData,
    infoLoading, cvLoading, handleUpdatePersonalInfo,
    pendingCvFile, handleCvFileSelect, handleCancelCv, handleSaveCv,
    ...emailHook,
    ...passwordHook,
    handleDeleteAccount, handleDeleteAccountConfirm, handleCloseDeleteModal,
    deleteModalOpen, deleteLoading, logout
  }), [
    activeSection, setActiveSection, accountData, infoLoading, cvLoading,
    handleUpdatePersonalInfo, pendingCvFile, handleCvFileSelect, handleCancelCv, handleSaveCv,
    emailHook, passwordHook, handleDeleteAccount, handleDeleteAccountConfirm,
    handleCloseDeleteModal, deleteModalOpen, deleteLoading, logout
  ]);
};

export const useCompanySettings = () => {
  const { accountData, refetch: refetchUserData } = useUserAccount();
  const { success: notifySuccess, error: notifyError } = useMainNotify();
  const { logout } = useLogout();

  const { params, updateParam } = useUrlSync({ tab: "account" });
  const activeSection = params.tab;
  const setActiveSection = useCallback((id) => updateParam("tab", id), [updateParam]);

  const emailHook = useChangeEmail(accountData, logout);
  const passwordHook = useChangePassword(accountData);

  const { refetch: updateCompanyInfoApi, loading: infoLoading } = useApi({ type: "companySettingInfo", autoFetch: false });
  const { refetch: updateCompanyAboutApi, loading: aboutLoading } = useApi({ type: "SettingCompanyAbout", autoFetch: false });
  const { refetch: deleteAccountApi, loading: deleteLoading } = useApi({ type: "deleteAccount", autoFetch: false });

  const handleUpdateCompanyInfo = useCallback(async (values) => {
    try {
      const formData = new FormData();
      if (values.photo instanceof File) {
        formData.append("photo", values.photo);
      }
      formData.append("Name", values.companyName || "");
      formData.append("Industry", values.industry || "");
      formData.append("PhoneNumber", values.phoneNumber || "");

      await updateCompanyInfoApi({ data: formData });
      notifySuccess("Success", "Company information updated successfully");
      refetchUserData();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to update company information");
    }
  }, [updateCompanyInfoApi, refetchUserData, notifySuccess, notifyError]);

  const handleUpdateCompanyAbout = useCallback(async (values) => {
    try {
      const payload = {
        websiteUrl: values.websiteUrl || "",
        about: values.about || "",
        locations: {
          city: values.city || "",
          country: values.country || "",
          government: values.governmentId || "",
        }
      };

      await updateCompanyAboutApi({ data: payload });
      notifySuccess("Success", "Company details and location updated successfully");
      refetchUserData();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to update company details");
    }
  }, [updateCompanyAboutApi, refetchUserData, notifySuccess, notifyError]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteAccount = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteAccountConfirm = useCallback(async (password) => {
    try {
      await deleteAccountApi({ data: { email: getVal(accountData, "", "email"), currentPassword: password } });
      notifySuccess("Account Deleted", "Your account has been successfully removed.");
      setDeleteModalOpen(false);
      logout();
    } catch (err) {
      notifyError("Error", get(err, "response.data.message") || "Failed to delete account");
    }
  }, [deleteAccountApi, accountData, logout, notifySuccess, notifyError]);

  const handleCloseDeleteModal = useCallback(() => setDeleteModalOpen(false), []);

  const result = useMemo(() => ({
    activeSection, setActiveSection, accountData,
    infoLoading, aboutLoading, deleteLoading,
    handleUpdateCompanyInfo, handleUpdateCompanyAbout,
    ...emailHook,
    ...passwordHook,
    handleDeleteAccount, handleDeleteAccountConfirm, handleCloseDeleteModal,
    deleteModalOpen, deleteLoading, logout
  }), [
    activeSection, setActiveSection, accountData,
    infoLoading, aboutLoading, deleteLoading,
    handleUpdateCompanyInfo, handleUpdateCompanyAbout,
    emailHook, passwordHook, handleDeleteAccount, handleDeleteAccountConfirm,
    handleCloseDeleteModal, deleteModalOpen, logout
  ]);

  return result;
};
