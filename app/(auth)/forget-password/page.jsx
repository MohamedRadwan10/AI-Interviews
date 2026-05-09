import ForgetPasswordPage from "@/Components/Pages/type/ForgetPassword";
import React, { Suspense } from "react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

export const metadata = {
  title: "Forget Password | IntelliHire",
  description: "Reset your IntelliHire account password.",
};

const Page = () => {
  return (
    <Suspense fallback={<RouteLoading type="forget-password" />}>
      <ForgetPasswordPage />
    </Suspense>
  );
};

export default Page;
