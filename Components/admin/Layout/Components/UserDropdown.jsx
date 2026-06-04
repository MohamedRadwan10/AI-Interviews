"use client";
import React from "react";
import { Avatar } from "primereact/avatar";
import MainButton from "@/Components/Common/MainButton";
import { LogOut, User } from "lucide-react";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const UserDropdown = ({ photoUrl, fullName, email, userType, menuItems, onLogout }) => {
  return (
    <div
      id="user-dropdown"
      className="absolute right-0 top-full mt-3 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="rounded-2xl border border-ui-borderLight dark:border-dark-gray/60 bg-white/90 dark:bg-dark-primary-4/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">

        <div className="px-4 py-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 border-b border-ui-borderLight dark:border-dark-gray/40">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <Avatar
                image={photoUrl}
                icon={!photoUrl ? "pi pi-user" : null}
                shape="circle"
                size="large"
                className={photoUrl ? "" : "bg-gradient-to-br from-brand-primary to-brand-secondary text-white"}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <MainText title={fullName} className="text-sm font-bold text-ui-textMain dark:text-white truncate" />
              <MainText title={email} className="text-xs text-ui-textMuted dark:text-ui-muted truncate" />
              {userType && (
                <span className="mt-1 inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-primary/10 text-brand-primary dark:text-brand-accent">
                  <User className="w-2.5 h-2.5" />
                  {userType}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-2">
          {map(menuItems, ({ label, icon: Icon, onClick }) => (
            <MainButton
              key={label}
              onClick={onClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ui-textMain dark:text-white/90 hover:bg-brand-primary/8 dark:hover:bg-brand-primary/15 hover:text-brand-primary dark:hover:text-brand-accent transition-all duration-150 border-none bg-transparent text-left"
            >
              <Icon className="w-4 h-4 shrink-0 opacity-70" />
              <span>{label}</span>
            </MainButton>
          ))}
        </div>

        <div className="mx-3 h-[1px] bg-ui-borderLight dark:bg-dark-gray/40" />

        <div className="p-2">
          <MainButton
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-status-error hover:bg-status-error/8 dark:hover:bg-status-error/15 transition-all duration-150 border-none bg-transparent text-left"
          >
            <LogOut className="w-4 h-4 shrink-0 opacity-80" />
            <span>Log Out</span>
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
