"use client";
import React, { Suspense } from "react";
import { useExternalLoginCallback } from "@/hooks/useAuth";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

const ExternalLoginCallbackContent = () => {
  useExternalLoginCallback();

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-dark-primary-1 bg-light-primary">
      <div className="text-center">
        <RouteLoading type="auth" />
        <p className="mt-4 text-light-black dark:text-dark-white animate-pulse">
          Completing your login...
        </p>
      </div>
    </div>
  );
};

const ExternalLoginCallbackPage = () => {
  return (
    <Suspense fallback={<RouteLoading type="auth" />}>
      <ExternalLoginCallbackContent />
    </Suspense>
  );
};

export default ExternalLoginCallbackPage;
