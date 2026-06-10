"use client";
import Theme from "@/Components/admin/Layout/Components/Theme";
import UserAvatar from "@/Components/admin/Layout/Components/UserAvatar";
import Logo from "./Components/Logo";
import NavMenu from "./Components/NavMenu";
import { Bell, Menu, Activity } from "lucide-react";
import MainButton from "@/Components/Common/MainButton";
import MainText from "@/Components/Common/MainText";
import useTopBar from "@/hooks/useTopbar";

const TopBar = () => {
  const {
    scrolled,
    mobileMenuOpen,
    activeSessionsCount,
    unreadNotificationsCount,
    isCandidate,
    handleSessionsClick,
    handleNotificationsClick,
    handleMobileMenuToggle,
  } = useTopBar();

  return (
    <header
      className={`relative sticky top-0 z-50 transition-all duration-500 w-full px-4 md:px-8 pt-4 pb-2 ${
        scrolled
          ? "bg-light-primary/80 dark:bg-dark-primary-4/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 lg:flex-none">
          <Logo />
        </div>

        <div className="hidden lg:block">
          <NavMenu />
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Notifications */}
          <div className="relative">
            <MainButton
              onClick={handleNotificationsClick}
              className="p-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-ui-borderLight dark:border-dark-gray text-ui-textMuted dark:text-ui-muted hover:text-brand-primary dark:hover:text-brand-accent transition-all"
            >
              <Bell className="w-5 h-5" />
            </MainButton>
            {unreadNotificationsCount > 0 && (
              <MainText
                tag="span"
                title={unreadNotificationsCount.toString()}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-status-error text-[10px] font-bold text-white border-2 border-light-primary dark:border-dark-primary-4 animate-bounce pointer-events-none"
              />
            )}
          </div>

          {/* Active Sessions — Candidates only */}
          {isCandidate && (
            <div className="relative">
              <MainButton
                onClick={handleSessionsClick}
                className="p-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-ui-borderLight dark:border-dark-gray text-ui-textMuted dark:text-ui-muted hover:text-brand-primary dark:hover:text-brand-accent transition-all"
              >
                <Activity className="w-5 h-5" />
              </MainButton>
              {activeSessionsCount > 0 && (
                <MainText
                  tag="span"
                  title={activeSessionsCount.toString()}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-status-error text-[10px] font-bold text-white border-2 border-light-primary dark:border-dark-primary-4 animate-bounce pointer-events-none"
                />
              )}
            </div>
          )}

          <div className="h-8 w-[1px] bg-ui-borderLight dark:bg-dark-gray mx-1 hidden sm:block" />

          <div className="flex items-center gap-3">
            <UserAvatar />
          </div>

          {/* Mobile menu toggle */}
          <MainButton
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2.5 rounded-2xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
          >
            <Menu className="w-5 h-5" />
          </MainButton>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 px-4 pt-2 z-50">
          <div className="rounded-2xl border border-ui-borderLight dark:border-dark-gray bg-light-primary dark:bg-dark-primary-3 shadow-xl p-4">
            <NavMenu isMobile />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;