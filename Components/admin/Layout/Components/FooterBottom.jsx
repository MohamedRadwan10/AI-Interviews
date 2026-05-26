"use client";
import React from "react";
import Link from "next/link";
import MainText from "@/Components/Common/MainText";

const FooterBottom = ({ copyright }) => {
  return (
    <div className="border-t border-ui-borderLight dark:border-dark-gray/50 py-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
      <MainText 
        title={copyright} 
        className="text-xs text-ui-textMuted dark:text-ui-muted font-medium" 
      />
      <div className="flex items-center gap-8">
        <Link href="/intelliHire/privacy" className="text-xs text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors">Privacy Policy</Link>
        <Link href="/intelliHire/terms" className="text-xs text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors">Terms of Service</Link>
        <Link href="/intelliHire/cookies" className="text-xs text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors">Cookie Settings</Link>
      </div>
    </div>
  );
};

export default FooterBottom;
