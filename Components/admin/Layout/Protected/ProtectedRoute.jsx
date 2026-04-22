"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRouter = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    setChecked(true);

    if (!storedToken && !refreshToken) {
      router.push("/login");
    }
  }, [router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRouter;