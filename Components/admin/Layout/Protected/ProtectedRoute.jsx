"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRouter = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    setChecked(true);

    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRouter;