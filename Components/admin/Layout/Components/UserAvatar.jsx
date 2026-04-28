"use client";
import React, { useRef, useMemo } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useLogout } from "@/hooks/useAuth";
import { useUserAccount } from "@/Context/UserAccountContext";
import { getImageUrl } from "@/Utils/Func/UrlHelper";
import { useNavigation } from "@/hooks/common";
import { getVal } from "@/Utils/Func/Common";
import MainButton from "@/Components/Common/MainButton";

const UserAvatar = () => {
  const menuRef = useRef(null);
  const { logout } = useLogout();
  const { accountData } = useUserAccount();
  const { navigateTo } = useNavigation();
  
  const photo = getVal(accountData, null, "photo", null);

  const photoUrl = useMemo(() => {
    if (!photo || photo === "N/A") return null;
    return getImageUrl(photo);
  }, [photo]);

  const avatarIcon = useMemo(() => {
    return !photoUrl ? "pi pi-user" : null;
  }, [photoUrl]);

  const avatarClassName = useMemo(() => {
    return `${photoUrl ? "" : "bg-dark-primary-2 text-dark-black"}`;
  }, [photoUrl]);

  const handleMenuToggle = (e) => menuRef.current?.toggle(e);

  const items = useMemo(() => [
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        logout();
      },
    },
  ], [logout]);

  return (
    <>
      <div className="relative inline-block">
        <MainButton
          type="button"
          onClick={handleMenuToggle}
          aria-controls="popup_menu"
          aria-haspopup="true"
          aria-label="User Profile and Menu"
          className="p-0 border-none bg-transparent cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-light-secondary"
        >
          <Avatar 
            image={photoUrl}
            icon={avatarIcon} 
            shape="circle" 
            size="large"
            className={avatarClassName} 
          />
        </MainButton>
      </div>
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
    </>
  );
};

export default UserAvatar;
