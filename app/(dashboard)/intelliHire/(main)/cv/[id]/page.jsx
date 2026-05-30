"use client";
import React from "react";
import MainPages from "@/Components/Pages";
import { useUserAccount } from "@/Context/UserAccountContext";
import { get } from "lodash-es";
import AccessDenied from "@/Components/Common/AccessDenied";

export default function Page() {
  const { accountData, loading } = useUserAccount();
  const userType = get(accountData, "userType");

  if (loading) return null;

  if (userType !== "Individual" && userType !== "Company") {
    return <AccessDenied />;
  }

  return <MainPages type="cv" />;
}
