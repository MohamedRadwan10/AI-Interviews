"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";

const PreferencesSection = ({ theme, handleThemeLight, handleThemeDark }) => {
  const isLightActive = theme === "light";
  const isDarkActive = theme === "dark";

  const lightButtonClass = `px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border-none ${
    isLightActive
      ? "bg-white dark:bg-dark-primary-1 text-brand-primary dark:text-brand-accent shadow-sm font-bold"
      : "bg-transparent text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain"
  }`;

  const darkButtonClass = `px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border-none ${
    isDarkActive
      ? "bg-white dark:bg-dark-primary-1 text-brand-primary dark:text-brand-accent shadow-sm font-bold"
      : "bg-transparent text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain"
  }`;

  return (
    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6 w-full">
      <div>
        <MainText tag="h2" title="Preferences" className="text-xl font-bold text-ui-textMain dark:text-white" />
        <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />
      </div>

      <div className="flex items-center justify-between gap-6 py-4">
        <div className="flex flex-col gap-1">
          <MainText title="Appearance (Theme)" className="text-base font-semibold text-ui-textMain dark:text-white" />
          <MainText title="Choose your preferred lighting for the dashboard." className="text-xs text-ui-textMuted dark:text-ui-muted" />
        </div>

        <div className="flex items-center gap-1 bg-light-blue50 dark:bg-dark-primary-3 p-1 rounded-2xl border border-ui-borderLight dark:border-dark-gray">
          <MainButton
            onClick={handleThemeLight}
            className={lightButtonClass}
            title="Light"
          />
          <MainButton
            onClick={handleThemeDark}
            className={darkButtonClass}
            title="Dark"
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
