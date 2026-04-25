"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";

const FooterBottom = ({ copyright }) => {
  return (
    <div className="border-t border-ui-borderLight dark:border-dark-gray/50 py-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
      <MainText 
        title={copyright} 
        className="text-xs text-ui-textMuted dark:text-ui-muted font-medium" 
      />
      <div className="flex items-center gap-8">
        <a href="#" className="text-xs text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="text-xs text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="text-xs text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors">Cookie Settings</a>
      </div>
    </div>
  );
};

export default FooterBottom;
