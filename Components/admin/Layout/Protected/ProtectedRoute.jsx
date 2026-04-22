"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const publicRoutes = ["/intelliHire", "/intelliHire/about", "/intelliHire/jobs"];

const ProtectedRouter = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (isPublicRoute) {
      setChecked(true);
      return;
    }

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      setChecked(true);

      if (!storedToken && !refreshToken) {
        router.push("/login");
      }
    }
  }, [router, pathname, isPublicRoute]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};


export default ProtectedRouter;