"use client";
import { Suspense } from "react";
import { get } from "lodash-es";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import AuthPageContent from "./components/AuthPageContent";

const AuthPage = (props) => {
  const type = get(props, "type", "form");
  return (
    <Suspense fallback={<RouteLoading type={type} />}>
      <AuthPageContent {...props} type={type} />
    </Suspense>
  );
};

export default AuthPage;