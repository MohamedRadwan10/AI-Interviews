"use client";

import MainPages from "@/Components/Pages";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { get } from "lodash-es";

export default function Page() {
  const { accountData, loading } = useUserAccount();
  const router = useRouter();
  const userType = get(accountData, "userType");

  useEffect(() => {
    if (!loading && userType === "Individual") {
      router.replace("/intelliHire/dashboard");
    }
  }, [userType, loading, router]);

  if (userType === "Individual") {
    return null;
  }

  return <MainPages type="dashboard" compType="company" />;
}
