"use client";

import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useAuth } from "@/hooks/useAuth";
import { useInterviewSessions } from "@/hooks/useInterviewSessions";
import { useNavigation } from "@/hooks/common";
import { Badge } from "primereact/badge";

const UserAvatar = () => {
  const menuRef = useRef(null);
  const { logout } = useAuth();
  const { navigateTo } = useNavigation();
  const { activeSessionsCount } = useInterviewSessions();

  const items = [
    {
      label: `Active Sessions (${activeSessionsCount})`,
      icon: "pi pi-play",
      command: () => {
        navigateTo("/intelliHire/active-sessions");
      },
    },
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
        <Avatar 
          icon="pi pi-user" 
          shape="circle" 
          className="bg-dark-primary-2 text-dark-black cursor-pointer" 
          onClick={(e) => menuRef.current?.toggle(e)}
          aria-controls="popup_menu" 
          aria-haspopup 
        />
        {activeSessionsCount > 0 && (
          <Badge 
            value={activeSessionsCount} 
            severity="danger" 
            className="absolute -top-1 -right-1 pointer-events-none"
          />
        )}
      </div>
      <Menu model={items} popup ref={menuRef} id="popup_menu" />
    </>
  );
};

export default UserAvatar;
