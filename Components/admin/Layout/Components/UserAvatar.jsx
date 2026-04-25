"use client";

import React, { useRef, useState, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useLogout } from "@/hooks/useAuth";
import { useUserAccount } from "@/Context/UserAccountContext";
import { getImageUrl } from "@/Utils/Func/UrlHelper";
import { useNavigation } from "@/hooks/common";
import { get } from "lodash-es";
import MainButton from "@/Components/Common/MainButton";

const UserAvatar = () => {
  const menuRef = useRef(null);
  const { logout } = useLogout();
  const { accountData } = useUserAccount();
  const { navigateTo } = useNavigation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const photo = get(accountData, "photo");
  const photoUrl = isMounted ? getImageUrl(photo) : null;

  const items = [
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        logout();
      },
    },
  ];

  return (
    <>
      <div className="relative inline-block">
        <MainButton
          type="button"
          onClick={(e) => menuRef.current?.toggle(e)}
          aria-controls="popup_menu"
          aria-haspopup="true"
          aria-label="User Profile and Menu"
          className="p-0 border-none bg-transparent cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-light-secondary"
        >
          <Avatar 
            image={photoUrl || null}
            icon={!photoUrl ? "pi pi-user" : null} 
            shape="circle" 
            size="large"
            className={`${photoUrl ? "" : "bg-dark-primary-2 text-dark-black"}`} 
          />
        </MainButton>
      </div>
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
    </>
  );
};

export default UserAvatar;
