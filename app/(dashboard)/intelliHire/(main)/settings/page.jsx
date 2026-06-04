"use client";
import React from "react";
import MainPage from "@/Components/Pages";
import { useUserAccount } from "@/Context/UserAccountContext";
import { get } from "lodash-es";
import AccessDenied from "@/Components/Common/AccessDenied";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

export default function Page() {
  const { accountData, loading } = useUserAccount();
  const userType = get(accountData, "userType");

  if (loading) return <RouteLoading type="Setting" />;


  if (userType !== "Individual" && userType !== "Company") {
    return <AccessDenied />;
  }

  // Use lower case to pass type and determine if Candidate or Company settings are rendered
  const compType = userType === "Individual" ? "candidate" : "company";

  return <MainPage type="setting" compType={compType} />;
}
