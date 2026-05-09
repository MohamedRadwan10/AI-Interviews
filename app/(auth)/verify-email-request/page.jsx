import React, { Suspense } from "react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import VerifyEmailRequestClient from "./VerifyEmailRequestClient";

export const metadata = {
  title: "Request Email Verification | IntelliHire",
  description: "Request a new email verification link for your IntelliHire account.",
};

const Page = () => {
  return (
    <Suspense fallback={<RouteLoading type="form" />}>
       <VerifyEmailRequestClient />
    </Suspense>
  );
};

export default Page;
