import { VerifyEmailProcessPage } from "@/Components/Pages/type/index";
import React, { Suspense } from "react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

export const metadata = {
  title: "Verify Email | IntelliHire",
  description: "Verifying your email address to secure your IntelliHire account.",
};

const Page = () => {
  return (
    <Suspense fallback={<RouteLoading type="verify-email" />}>
       <VerifyEmailProcessPage />
    </Suspense>
  );
};

export default Page;
