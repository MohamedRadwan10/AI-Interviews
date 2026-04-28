"use client";
import { VerifyEmailRequestPage } from "@/Components/Pages/type/index";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VerifyEmailRequestClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const userId = searchParams.get("userId") || searchParams.get("userid");
    const token = searchParams.get("token");
    
    if (userId && token) {
      router.replace(`/verify-email?userId=${userId}&token=${encodeURIComponent(token)}`);
    }
  }, [searchParams, router]);

  return <VerifyEmailRequestPage />;
};

export default VerifyEmailRequestClient;
