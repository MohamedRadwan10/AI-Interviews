"use client";
import React, { useMemo, useCallback } from "react";
import * as Yup from "yup";
import { User, Building, Palette, Shield } from "lucide-react";
import { Formik, Form } from "formik";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { useCompanySettings } from "@/hooks/useSetting";
import { useDarkMode } from "@/Context/DarkModeContext";
import SettingSidebar from "@/Components/Sidebars/SettingSidebar";
import CompanyInfoSection from "@/Components/Settings/Company/CompanyInfoSection";
import AboutSection from "@/Components/Settings/Company/AboutSection";
import LocationSection from "@/Components/Settings/Company/LocationSection";
import PreferencesSection from "@/Components/Settings/Common/PreferencesSection";
import SecuritySection from "@/Components/Settings/Common/SecuritySection";
import EmailModal from "@/Components/Modal/EmailModal";
import PasswordModal from "@/Components/Modal/PasswordModal";
import DeleteAccountModal from "@/Components/Modal/DeleteAccountModal";

const sidebarItems = [
  { id: "account", label: "Account details", icon: User },
  { id: "about", label: "About & Location", icon: Building },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "security", label: "Security & Privacy", icon: Shield }
];

export const CompanySetting = () => {
  const {
    activeSection, setActiveSection, accountData,
    infoLoading, aboutLoading, deleteLoading,
    handleUpdateCompanyInfo, handleUpdateCompanyAbout,
    emailModalOpen, setEmailModalOpen,
    emailStep, setEmailStep, email1Loading, email2Loading, email3Loading,
    handleEmailStep1, handleEmailStep2, handleEmailStep3, handleResendEmailOtp, passwordModalOpen,
    setPasswordModalOpen, passwordStep, setPasswordStep, pass1Loading, pass2Loading,
    pass3Loading, handlePasswordStep1, handlePasswordStep2, handlePasswordStep3, logout, handleDeleteAccount,
    handleDeleteAccountConfirm, handleCloseDeleteModal, deleteModalOpen
  } = useCompanySettings();

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
    photo: accountData?.photo || null,
    companyName: accountData?.companyName || "",
    industry: accountData?.industry || "",
    phoneNumber: accountData?.phoneNumber || ""
  }), [accountData]);

  const personalSchema = useMemo(() => Yup.object().shape({
    companyName: Yup.string().required("Company name is required").min(2, "Too short"),
    industry: Yup.string().required("Industry is required"),
    phoneNumber: Yup.string().required("Phone number is required").matches(/^(\+2)?01[0125][0-9]{8}$/, "Invalid phone number")
  }), []);

  const combinedAboutInitialValues = useMemo(() => ({
    about: accountData?.about || "",
    websiteUrl: accountData?.websiteUrl || "",
    country: accountData?.country || "",
    governmentId: accountData?.governmentId || "",
    city: accountData?.city || ""
  }), [accountData]);

  const combinedAboutSchema = useMemo(() => Yup.object().shape({
    about: Yup.string().nullable(),
    websiteUrl: Yup.string().matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, "Invalid URL").nullable(),
    country: Yup.string().required("Country is required"),
    governmentId: Yup.string().required("Governorate is required"),
    city: Yup.string().required("Detailed address is required")
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
            {activeSection === "account" && <CompanyInfoSection initialValues={personalInitialValues} validationSchema={personalSchema} onSubmit={handleUpdateCompanyInfo} infoLoading={infoLoading} onCancel={handleCloseEmailModal} />}
            {activeSection === "about" && (
              <Formik
                initialValues={combinedAboutInitialValues}
                validationSchema={combinedAboutSchema}
                onSubmit={handleUpdateCompanyAbout}
                enableReinitialize
              >
                {({ values, errors, touched, setFieldValue, handleBlur }) => (
                  <Form className="flex flex-col gap-6 w-full">
                    <AboutSection values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                    <LocationSection values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                    
                    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex justify-end items-center gap-6 w-full font-sans">
                      <MainButton
                        type="button"
                        onClick={handleCloseEmailModal}
                        className="text-sm font-semibold text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white bg-transparent border-none outline-none cursor-pointer transition-colors"
                        title="Cancel"
                      />
                      <MainButton
                        type="submit"
                        disabled={aboutLoading}
                        className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-2xl hover:bg-brand-primaryDark transition-all shadow-md border-none cursor-pointer"
                        title={aboutLoading ? "Saving..." : "Save changes"}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            )}
            {activeSection === "preferences" && <PreferencesSection theme={theme} handleThemeLight={handleThemeLight} handleThemeDark={handleThemeDark} />}
            {activeSection === "security" && <SecuritySection accountData={accountData} handleOpenEmailModal={handleOpenEmailModal} handleOpenPasswordModal={handleOpenPasswordModal} handleDeleteAccount={handleDeleteAccount} deleteLoading={deleteLoading} handleLogout={logout} />}
          </div>
        </div>
      </div>
      <EmailModal emailModalOpen={emailModalOpen} handleCloseEmailModal={handleCloseEmailModal} emailStep={emailStep} emailInitialValues={emailInitialValues} emailSchema={emailSchema} handleEmailStep1={handleEmailStep1} email1Loading={email1Loading} handleEmailStep2={handleEmailStep2} email2Loading={email2Loading} handleEmailStep3={handleEmailStep3} email3Loading={email3Loading} handleResendEmailOtp={handleResendEmailOtp} />
      <PasswordModal passwordModalOpen={passwordModalOpen} handleClosePasswordModal={handleClosePasswordModal} passwordStep={passwordStep} pass1Loading={pass1Loading} pass2Loading={pass2Loading} pass3Loading={pass3Loading} handlePasswordStep1={handlePasswordStep1} handlePasswordStep2={handlePasswordStep2} handlePasswordStep3={handlePasswordStep3} passwordInitialValues={passwordInitialValues} passwordSchema={passwordSchema} />
      <DeleteAccountModal visible={deleteModalOpen} onHide={handleCloseDeleteModal} onConfirm={handleDeleteAccountConfirm} isLoading={deleteLoading} />
    </div>
  );
};

export default CompanySetting;
