"use client";
import React from "react";
import Link from "next/link";
import MainImage from "@/Components/Common/Image";
import MainText from "@/Components/Common/MainText";
import logoImage from "@/public/assets/logo.png";
import { get, map } from "lodash-es";
import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

const FooterBrand = ({ desc }) => {
  const logo = get(logoImage, "src", logoImage);
  const socials = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white dark:bg-dark-primary-1 rounded-2xl flex items-center justify-center p-1.5 shadow-sm border border-ui-borderLight dark:border-dark-gray">
          <MainImage src={logo} alt="IntelliHire Logo" width={40} height={40} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center leading-none">
            <MainText tag="span" title="Intelli" className="text-xl font-black text-ui-textMain dark:text-white" />
            <MainText tag="span" title="Hire" className="text-xl font-black text-brand-primary dark:text-brand-accent" />
          </div>
        </div>
      </div>
      
      <MainText title={desc} className="text-sm text-ui-textMuted dark:text-ui-muted leading-relaxed" />
      
      {/* <div className="flex items-center gap-4">
        {map(socials, (social, idx) => (
          <a 
            key={idx} 
            href={social.href} 
            className="w-10 h-10 rounded-xl bg-light-primary dark:bg-dark-primary-3 flex items-center justify-center text-ui-textMuted dark:text-ui-muted hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-dark-primary-4 transition-all duration-300"
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div> */}
    </div>
  );
};

export default FooterBrand;
