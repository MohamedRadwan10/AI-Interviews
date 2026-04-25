"use client";
import React from "react";
import Link from "next/link";
import { map, get } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const FooterColumn = ({ title, links }) => {
  return (
    <div className="flex flex-col gap-6">
      <MainText 
        tag="h4" 
        title={title} 
        className="text-sm font-bold uppercase tracking-widest text-ui-textMain dark:text-white" 
      />
      <div className="flex flex-col gap-4">
        {map(links, (link, idx) => {
          const text = get(link, "text") || get(link, "label");
          const href = get(link, "href") || get(link, "path");
          const icon = get(link, "icon");

          return (
            <Link 
              key={idx} 
              href={href || "#"} 
              className="group flex items-center gap-3 text-sm text-ui-textMuted dark:text-ui-muted hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
            >
              {icon && <i className={`${icon} text-brand-primary dark:text-brand-accent`} />}
              <span className="relative overflow-hidden">
                {text}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-primary dark:bg-brand-accent group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FooterColumn;
