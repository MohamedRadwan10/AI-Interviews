"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { get, map } from "lodash-es";
import { useNavMenu } from "@/hooks/useTopbar";

const NavMenu = ({ isMobile = false }) => {
  const { displayNavigation } = useNavMenu();
  const pathname = usePathname();

  return (
    <nav className={
      isMobile
        ? "flex flex-col w-full"
        : "hidden lg:flex items-center bg-light-primary/50 dark:bg-dark-primary-3/30 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-inner"
    }>
      <ul className={isMobile ? "flex flex-col w-full gap-1" : "flex items-center gap-1"}>
        {map(displayNavigation, (item) => {
          const label = get(item, "label");
          const path = get(item, "path");
          const isActive = pathname === path;

          return (
            <li key={path} className={isMobile ? "w-full" : ""}>
              <Link href={path} aria-current={isActive ? "page" : undefined}>
                <div className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isMobile ? "w-full" : ""
                } ${
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