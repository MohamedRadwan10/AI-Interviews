import React from "react";
import { Button } from "primereact/button";
import MainText from "./MainText";
import { useNavigation } from "@/hooks/common";
import { useUserAccount } from "@/Context/UserAccountContext";

const AccessDenied = () => {
  const { navigateBack, navigateTo } = useNavigation();
  const { accountData } = useUserAccount();
  const isLoggedIn = !!accountData;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <i className="pi pi-lock text-6xl text-red-500 mb-4 animate-bounce"></i>
      <MainText tag="h1" title="Access Denied" className="text-3xl font-bold mb-2 text-ui-textMain dark:text-white" />
      <MainText 
        tag="p" 
        title={isLoggedIn ? "You do not have permission to access this page." : "You must be signed in to access this page."} 
        className="text-gray-600 dark:text-ui-muted mb-6 max-w-md"
      />
      <div className="flex items-center gap-4">
        <Button 
          label="Go Back" 
          icon="pi pi-arrow-left" 
          onClick={navigateBack} 
          className="p-button-outlined p-button-secondary"
        />
        {!isLoggedIn && (
          <Button 
            label="Sign In" 
            icon="pi pi-sign-in" 
            onClick={() => navigateTo("/login")} 
            className="p-button-primary"
          />
        )}
      </div>
    </div>
  );
};

export default AccessDenied;
