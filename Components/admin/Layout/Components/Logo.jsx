"use client";
import React from "react";
import Link from "next/link";
import MainImage from "@/Components/Common/Image";
import MainText from "@/Components/Common/MainText";
import logoImage from "@/public/assets/logo.png";
import { get } from "lodash-es";

const Logo = () => {
  const logo = get(logoImage, "src");

  return (
    <Link href="/intelliHire" className="flex items-center gap-3 group">
      <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-dark-primary-3 rounded-2xl flex items-center justify-center p-1.5 shadow-sm border border-ui-borderLight dark:border-dark-gray group-hover:scale-105 transition-transform">
        <MainImage
          src={logo}
          alt="IntelliHire Logo"
          width={40}
          height={40}
          priority={true}
          imageClassName="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <MainText
            tag="span"
            title="Intelli"
            className="text-xl md:text-2xl font-black text-ui-textMain dark:text-white"
          />
          <MainText
            tag="span"
            title="Hire"
            className="text-xl md:text-2xl font-black text-brand-primary dark:text-brand-accent"
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ui-textMuted dark:text-ui-muted mt-0.5">
          AI-Powered Recruitment
        </span>
      </div>
    </Link>
  );
};

export default Logo;
