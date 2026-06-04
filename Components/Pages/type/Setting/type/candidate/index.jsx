"use client";
import React, { useMemo, useCallback } from "react";
import * as Yup from "yup";
import { User, FileText, Palette, Shield } from "lucide-react";
import MainText from "@/Components/Common/MainText";
import { useCandidateSettings } from "@/hooks/useSetting";
import { useDarkMode } from "@/Context/DarkModeContext";
import SettingSidebar from "@/Components/Sidebars/SettingSidebar";
import PersonalInfoSection from "@/Components/Settings/Candidate/PersonalInfoSection";
import ResumeSection from "@/Components/Settings/Candidate/ResumeSection";
import PreferencesSection from "@/Components/Settings/Common/PreferencesSection";
import SecuritySection from "@/Components/Settings/Common/SecuritySection";
import EmailModal from "@/Components/Modal/EmailModal";
import PasswordModal from "@/Components/Modal/PasswordModal";

const sidebarItems = [
  { id: "account", label: "Account details", icon: User },
  { id: "resume", label: "Resume & CV", icon: FileText },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "security", label: "Security & Privacy", icon: Shield }
];

export const CandidateSetting = () => {
  const {
    activeSection, setActiveSection, accountData, infoLoading, cvLoading,
    handleUpdatePersonalInfo, pendingCvFile, handleCvFileSelect, handleCancelCv, handleSaveCv,
    emailModalOpen, setEmailModalOpen,
    emailStep, setEmailStep, email1Loading, email2Loading, email3Loading,
    handleEmailStep1, handleEmailStep2, handleEmailStep3, handleResendEmailOtp, passwordModalOpen,
    setPasswordModalOpen, passwordStep, setPasswordStep, pass1Loading, pass2Loading,
    pass3Loading, handlePasswordStep1, handlePasswordStep2, handlePasswordStep3,
    handleDeleteAccount, deleteLoading, logout
  } = useCandidateSettings();

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const theme = isDarkMode ? "dark" : "light";

  const handleSectionChange = useCallback((id) => setActiveSection(id), [setActiveSection]);
  const handleCloseEmailModal = useCallback(() => setEmailModalOpen(false), [setEmailModalOpen]);
  const handleClosePasswordModal = useCallback(() => setPasswordModalOpen(false), [setPasswordModalOpen]);

  const handleOpenEmailModal = useCallback(() => {
    setEmailStep(1);
    setEmailModalOpen(true);
  }, [setEmailStep, setEmailModalOpen]);

  const handleOpenPasswordModal = useCallback(() => {
    setPasswordStep(1);
    setPasswordModalOpen(true);
    handlePasswordStep1();
  }, [setPasswordStep, setPasswordModalOpen, handlePasswordStep1]);

  const handleThemeLight = useCallback(() => {
    if (isDarkMode) toggleDarkMode();
  }, [isDarkMode, toggleDarkMode]);

  const handleThemeDark = useCallback(() => {
    if (!isDarkMode) toggleDarkMode();
  }, [isDarkMode, toggleDarkMode]);

  const personalInitialValues = useMemo(() => ({
    Photo: accountData?.photo || null,
    FullName: accountData?.fullName || "",
    PhoneNumber: accountData?.phoneNumber || ""
  }), [accountData]);

  const personalSchema = useMemo(() => Yup.object().shape({
    FullName: Yup.string().required("Full name is required").min(3, "Too short"),
    PhoneNumber: Yup.string().required("Phone number is required").matches(/^(\+2)?01[0125][0-9]{8}$/, "Invalid phone number")
  }), []);

  const emailInitialValues = useMemo(() => ({ email: "", currentPassword: "" }), []);
  const emailSchema = useMemo(() => Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    currentPassword: Yup.string().required("Password is required")
  }), []);

  const passwordInitialValues = useMemo(() => ({ currentPassword: "", newPassword: "", confirmPassword: "" }), []);
  const passwordSchema = useMemo(() => Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().required("New password is required").min(8, "Minimum 8 characters"),
    confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("newPassword")], "Passwords do not match")
  }), []);

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <MainText tag="h1" title="Settings" className="text-3xl font-bold text-ui-textMain dark:text-white" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-4">
          <SettingSidebar sidebarItems={sidebarItems} activeSection={activeSection} onSectionChange={handleSectionChange} />
          <div className="lg:col-span-3 flex flex-col w-full">
            {activeSection === "account" && <PersonalInfoSection initialValues={personalInitialValues} validationSchema={personalSchema} onSubmit={handleUpdatePersonalInfo} infoLoading={infoLoading} onCancel={handleCloseEmailModal} />}
            {activeSection === "resume" && <ResumeSection accountData={accountData} pendingCvFile={pendingCvFile} onCvFileSelect={handleCvFileSelect} onCancelCv={handleCancelCv} onSaveCv={handleSaveCv} cvLoading={cvLoading} />}
            {activeSection === "preferences" && <PreferencesSection theme={theme} handleThemeLight={handleThemeLight} handleThemeDark={handleThemeDark} />}
            {activeSection === "security" && <SecuritySection accountData={accountData} handleOpenEmailModal={handleOpenEmailModal} handleOpenPasswordModal={handleOpenPasswordModal} handleDeleteAccount={handleDeleteAccount} deleteLoading={deleteLoading} handleLogout={logout} />}
          </div>
        </div>
      </div>
      <EmailModal emailModalOpen={emailModalOpen} handleCloseEmailModal={handleCloseEmailModal} emailStep={emailStep} emailInitialValues={emailInitialValues} emailSchema={emailSchema} handleEmailStep1={handleEmailStep1} email1Loading={email1Loading} handleEmailStep2={handleEmailStep2} email2Loading={email2Loading} handleEmailStep3={handleEmailStep3} email3Loading={email3Loading} handleResendEmailOtp={handleResendEmailOtp} />
      <PasswordModal passwordModalOpen={passwordModalOpen} handleClosePasswordModal={handleClosePasswordModal} passwordStep={passwordStep} pass1Loading={pass1Loading} pass2Loading={pass2Loading} pass3Loading={pass3Loading} handlePasswordStep1={handlePasswordStep1} handlePasswordStep2={handlePasswordStep2} handlePasswordStep3={handlePasswordStep3} passwordInitialValues={passwordInitialValues} passwordSchema={passwordSchema} />
    </div>
  );
};

export default CandidateSetting;
