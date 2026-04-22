"use client";
import { VerifyEmailRequestPage } from "@/Components/Pages/type/index";
import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

const PageContent = () => {
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

const Page = () => {
  return (
    <Suspense fallback={<RouteLoading />}>
       <PageContent />
    </Suspense>
  );
};

export default Page;
