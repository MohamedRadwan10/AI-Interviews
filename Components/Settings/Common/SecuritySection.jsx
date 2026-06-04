"use client";
import React from "react";
import { Trash2, LogOut } from "lucide-react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { getVal } from "@/Utils/Func/Common";

const SecuritySection = ({ accountData, handleOpenEmailModal, handleOpenPasswordModal, handleDeleteAccount, deleteLoading, handleLogout }) => {
  return (
    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6 w-full">
      <div>
        <MainText tag="h2" title="Security & Privacy" className="text-xl font-bold text-ui-textMain dark:text-white" />
        <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />
      </div>

      <div className="flex items-center justify-between gap-6 py-4 border-b border-ui-borderLight dark:border-dark-gray/20">
        <div className="flex flex-col gap-1">
          <MainText title="Email Address" className="text-base font-semibold text-ui-textMain dark:text-white" />
          <MainText title={getVal(accountData, "", "email")} className="text-xs text-ui-textMuted dark:text-ui-muted" />
        </div>
        <MainButton
          onClick={handleOpenEmailModal}
          className="px-5 py-2.5 bg-brand-primary/10 text-brand-primary dark:text-brand-accent hover:bg-brand-primary/20 font-semibold rounded-xl transition-all border-none"
          title="Change Email"
        />
      </div>

      <div className="flex items-center justify-between gap-6 py-4 border-b border-ui-borderLight dark:border-dark-gray/20">
        <div className="flex flex-col gap-1">
          <MainText title="Change Password" className="text-base font-semibold text-ui-textMain dark:text-white" />
          <MainText title="Request to securely update your account password" className="text-xs text-ui-textMuted dark:text-ui-muted" />
        </div>
        <MainButton
          onClick={handleOpenPasswordModal}
          className="px-5 py-2.5 bg-brand-primary text-white hover:bg-brand-primaryDark font-semibold rounded-xl transition-all border-none shadow-sm"
          title="Change Password"
        />
      </div>

      <div className="flex items-center justify-between gap-6 py-4 border-b border-ui-borderLight dark:border-dark-gray/20">
        <div className="flex flex-col gap-1">
          <MainText title="Log Out" className="text-base font-semibold text-ui-textMain dark:text-white" />
          <MainText title="Log out from your current session securely" className="text-xs text-ui-textMuted dark:text-ui-muted" />
        </div>
        <MainButton
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-ui-borderLight dark:bg-dark-gray/30 text-ui-textMain dark:text-white hover:bg-ui-borderLight/80 dark:hover:bg-dark-gray/40 font-semibold rounded-xl transition-all border-none"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Log Out</span>
        </MainButton>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <MainText title="Account Management" className="text-sm font-semibold text-status-error uppercase tracking-wider" />
        <MainText title="Once you delete your account, there is no going back. All your data including resume and job applications will be permanently removed." className="text-xs text-ui-textMuted dark:text-ui-muted" />
        <MainButton
          onClick={handleDeleteAccount}
          disabled={deleteLoading}
          className="w-fit flex items-center gap-2 px-5 py-3 bg-status-error/15 text-status-error hover:bg-status-error/25 font-semibold rounded-xl border border-status-error/20 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          <span>{deleteLoading ? "Deleting..." : "Delete Account"}</span>
        </MainButton>
      </div>
    </div>
  );
};

export default SecuritySection;
