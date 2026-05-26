"use client";

import React from "react";
import { useUserAccount } from "@/Context/UserAccountContext";
import { get } from "lodash-es";
import AccessDenied from "./AccessDenied";

const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { accountData, loading } = useUserAccount();
  const userType = get(accountData, "userType");

  if (loading) {
    return null;
  }

  const isAllowed = userType && allowedRoles.includes(userType);
  if (allowedRoles.length > 0 && !isAllowed) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default RoleGuard;
