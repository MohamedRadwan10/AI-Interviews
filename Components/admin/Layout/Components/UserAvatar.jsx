"use client";
import React, { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { useLogout } from "@/hooks/useAuth";
import { useUserAccount } from "@/Context/UserAccountContext";
import { getImageUrl } from "@/Utils/Func/UrlHelper";
import { useNavigation } from "@/hooks/common";
import { getVal } from "@/Utils/Func/Common";
import MainButton from "@/Components/Common/MainButton";
import UserDropdown from "@/Components/admin/Layout/Components/UserDropdown";
import { Settings, FileText, ChevronDown } from "lucide-react";
import { NAVIGATION_ROUTES } from "@/Config/navigationConfig";

const UserAvatar = () => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const { accountData } = useUserAccount();
  const { navigateTo } = useNavigation();



  const userId = getVal(accountData, null, "id", null);
  const photo = getVal(accountData, null, "photo", null);
  const fullName = getVal(accountData, null, "fullName", "User");
  const companyName = getVal(accountData, null, "companyName", "Company");
  const email = getVal(accountData, null, "email", "");
  const userType = getVal(accountData, null, "userType", null);
  const Name = useMemo(() => userType === "Individual" ? fullName : companyName, [userType, fullName, companyName]);

  const photoUrl = useMemo(() => {
    if (!photo || photo === "N/A") return null;
    return getImageUrl(photo);
  }, [photo]);

  const avatarIcon = useMemo(() => (!photoUrl ? "pi pi-user" : null), [photoUrl]);
  const avatarClassName = useMemo(() => (
    photoUrl ? "" : "bg-gradient-to-br from-brand-primary to-brand-secondary text-white"
  ), [photoUrl]);

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleNavigate = useCallback((path) => {
    navigateTo(path);
    handleClose();
  }, [navigateTo, handleClose]);

  const handleLogout = useCallback(() => {
    logout();
    handleClose();
  }, [logout, handleClose]);

  const handleCvClick = useCallback(() => handleNavigate(NAVIGATION_ROUTES.candidate.cv(userId)), [handleNavigate, userId]);
  const handleSettingsClick = useCallback(() => handleNavigate(NAVIGATION_ROUTES.common.settings), [handleNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  const menuItems = useMemo(() => {
    const items = [];
    if (userType === "Individual") {
      items.push({ label: "My CV", icon: FileText, onClick: handleCvClick });
    }
    items.push({ label: "Settings", icon: Settings, onClick: handleSettingsClick });
    return items;
  }, [userType, handleCvClick, handleSettingsClick]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <MainButton
        type="button"
        onClick={handleToggle}
        aria-controls="user-dropdown"
        aria-haspopup="true"
        aria-label="User Profile and Menu"
        className="flex items-center gap-2 p-1 pr-3 border border-ui-borderLight dark:border-dark-gray/60 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-2xl transition-all duration-200 cursor-pointer backdrop-blur-sm focus:ring-0"
      >
        <Avatar
          image={photoUrl}
          icon={avatarIcon}
          shape="circle"
          size="normal"
          className={avatarClassName}
        />
        <ChevronDown
          className={`w-3.5 h-3.5 text-ui-textMuted dark:text-ui-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </MainButton>

      {isOpen && (
        <UserDropdown
          photoUrl={photoUrl}
          fullName={Name}
          email={email}
          userType={userType}
          menuItems={menuItems}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default UserAvatar;
