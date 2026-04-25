"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { map, get } from "lodash-es";
import { navigation } from "@/Config/LayoutConfig";

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center bg-light-primary/50 dark:bg-dark-primary-3/30 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-inner">
      <ul className="flex items-center gap-1">
        {map(navigation, (item) => {
          const label = get(item, "label");
          const path = get(item, "path");
          const isActive = pathname === path;

          return (
            <li key={path}>
              <Link href={path}>
                <div className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? "bg-white dark:bg-dark-primary-1 text-brand-primary dark:text-brand-accent shadow-sm" 
                    : "text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}>
                  {label}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
