"use client";

import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useAuth } from "@/hooks/useAuth";

const UserAvatar = () => {
  const menuRef = useRef(null);
  const { logout } = useAuth();

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
      <Avatar 
        icon="pi pi-user" 
        shape="circle" 
        className="bg-dark-primary-2 text-dark-black cursor-pointer" 
        onClick={(e) => menuRef.current?.toggle(e)}
        aria-controls="popup_menu" 
        aria-haspopup 
      />
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
    </>
  );
};

export default UserAvatar;
