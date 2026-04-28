"use client";

import React from "react";
import { Search } from "lucide-react";
import MainInput from "./Inputs";

const MainSearch = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "" 
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-textMuted z-10 pointer-events-none">
        <Search size={18} />
      </div>
      <MainInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fieldClassName="!pl-10 !py-3 !rounded-2xl !bg-light-primary dark:!bg-dark-primary-4 !border-none !ring-1 !ring-ui-borderLight dark:!ring-ui-border focus:!ring-brand-primary transition-all"
        containerClassName="!mb-0"
      />
    </div>
  );
};

export default MainSearch;
