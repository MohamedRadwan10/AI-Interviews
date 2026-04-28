import React from "react";
import { Button } from "primereact/button";
import MainText from "./MainText";
import { useNavigation } from "@/hooks/common";

const AccessDenied = () => {
const { navigateBack } = useNavigation()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <i className="pi pi-lock text-6xl text-red-500 mb-4"></i>
      <MainText tag="h1" title="Access Denied" className="text-3xl font-bold mb-2"/>
      <MainText tag="p" title="You do not have permission to access this page." className="text-gray-600 mb-6 max-w-md"/>
      <Button 
        label="Go Back" 
        icon="pi pi-arrow-left" 
        onClick={navigateBack} 
        className="p-button-outlined"
      />
    </div>
  );
};

export default AccessDenied;
