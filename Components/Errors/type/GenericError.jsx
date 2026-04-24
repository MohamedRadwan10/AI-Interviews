"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { AlertTriangle } from "lucide-react";

const GenericError = ({ error, className = "" }) => {
  if (!error) return null;
  
  const errorMessage = typeof error === "object" ? (error.message || JSON.stringify(error)) : error;
  
  return (
    <div className={`flex items-center gap-2 p-3 bg-status-error/10 border border-status-error/20 text-status-error rounded-xl text-xs font-medium ${className}`}>
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <MainText className="flex-1 text-left">{errorMessage}</MainText>
    </div>
  );
};

export default GenericError;
