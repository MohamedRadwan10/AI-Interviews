"use client";

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const [token, setToken] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    setToken(storedToken);
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouter;
