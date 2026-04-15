"use client";
import { VerifyEmailProcessPage } from "@/Components/Pages/type/index";
import React, { Suspense } from "react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

const page = () => {
  return (
    <Suspense fallback={<RouteLoading />}>
       <VerifyEmailProcessPage />
    </Suspense>
  );
};

export default page;
