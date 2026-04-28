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

  if (userType && allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default RoleGuard;
