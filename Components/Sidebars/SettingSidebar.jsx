"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";

const SettingSidebar = ({ sidebarItems, activeSection, onSectionChange }) => {
  return (
    <div className="lg:col-span-1 bg-light-white dark:bg-dark-primary-4 rounded-3xl p-4 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-1.5">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <MainButton
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 outline-none focus:ring-0 ${
              isActive
                ? "bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 text-brand-primary dark:text-brand-accent"
                : "text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white hover:bg-light-blue50/50 dark:hover:bg-white/5"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <MainText title={item.label}  />
          </MainButton>
        );
      })}
    </div>
  );
};

export default SettingSidebar;
