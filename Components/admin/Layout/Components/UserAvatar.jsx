"use client";

import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useLogout } from "@/hooks/useAuth";
import { useInterviewSessions } from "@/hooks/useActiveSessions";
import { useNavigation } from "@/hooks/common";
import { Badge } from "primereact/badge";
import MainButton from "@/Components/Common/MainButton";

const UserAvatar = () => {
  const menuRef = useRef(null);
  const { logout } = useLogout();
  const { navigateTo } = useNavigation();
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
            icon="pi pi-user" 
            shape="circle" 
            className="bg-dark-primary-2 text-dark-black" 
          />
        </MainButton>
      </div>
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
    </>
  );
};

export default UserAvatar;
