"use client";
import React, { createContext, useContext } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const confirm = (options) => {
    confirmDialog({
      ...options,
      className: `custom-confirm-dialog ${options.className || ""}`,
    });
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      <ConfirmDialog 
        pt={{
          root: { className: "max-w-[450px] rounded-[2rem] overflow-hidden border-none shadow-2xl bg-white dark:bg-dark-primary-2" },
          header: { className: "p-8 pb-4 bg-white dark:bg-dark-primary-2 text-ui-textMain dark:text-white font-bold text-2xl border-none" },
          content: { className: "p-8 pt-0 bg-white dark:bg-dark-primary-2 text-ui-textMuted dark:text-ui-muted border-none text-lg" },
          footer: { className: "p-8 pt-4 bg-white dark:bg-dark-primary-2 border-none flex justify-end gap-4" },
          acceptButton: { className: "bg-brand-primary hover:bg-brand-primary/90 border-none rounded-2xl px-8 py-3.5 font-bold transition-all shadow-lg shadow-brand-primary/20" },
          rejectButton: { className: "bg-transparent border-2 border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted rounded-2xl px-8 py-3.5 font-bold transition-all hover:bg-light-primary dark:hover:bg-dark-primary-3" },
          mask: { className: "backdrop-blur-sm bg-black/40" }
        }}
      />
      {children}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  return context;
};
