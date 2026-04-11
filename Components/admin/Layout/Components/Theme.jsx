"use client";

import { useDarkMode } from "@/Context/DarkModeContext";
import { Moon, Sun } from "lucide-react";
import React from "react";

import MainButton from "@/Components/Common/MainButton";

const Theme = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const circlePosition = isDarkMode ? "translate-x-[1.6rem]" : "translate-x-0";

  return (
    <div className="flex items-center gap-2">
      <MainButton
        onClick={toggleDarkMode}
        className={`
          relative w-14 h-7 p-1 rounded-2xl border border-light-black dark:border-dark-white cursor-pointer
          transition-colors duration-300
          bg-transparent focus:ring-0
        `}
      >
        <div
          className={`
            absolute top-0.5 left-0.5
            w-6 h-6 rounded-full bg-dark-primary-2 dark:bg-dark-white shadow-md
            flex items-center justify-center
            transition-transform duration-300
            ${circlePosition} z-[10]
          `}
        ></div>

        <div className="absolute inset-0 flex items-center justify-between gap-2 px-1.5 z-20">
          <Sun
            className="w-6 h-6 dark:text-dark-white text-light-white opacity-50"
          />
          <Moon
            className="w-6 h-6 dark:text-dark-secondary text-light-black opacity-50"
          />
        </div>
      </MainButton>
    </div>
  );
};

export default Theme;
