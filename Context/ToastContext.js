"use client";
import React, { createContext, useRef } from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  return (
    <ToastContext.Provider value={{ ref: toastRef }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
