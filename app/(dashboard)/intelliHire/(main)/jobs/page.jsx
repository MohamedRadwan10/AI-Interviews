"use client";

import MainPage from "@/Components/Pages";
import { useUserAccount } from "@/Context/UserAccountContext";
import { get } from "lodash-es";
import AccessDenied from "@/Components/Common/AccessDenied";


const Page = () => {
  const { accountData, loading } = useUserAccount();
  const userType = get(accountData, "userType");

  if (loading) return null;

  if (userType === "Company") {
    return <AccessDenied />;
  }

  return <MainPage type="jobs" />;
};

export default Page;
