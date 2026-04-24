"use client";
import React from "react";
import AuthPage from "@/Components/auth/AuthPage";
import { candidateOnboardingConfig } from "@/Config/FieldsConfig";
import { useCompleteProfile } from "@/hooks/useAuth";

const CandidateOnboarding = () => {
  const { completeProfile, isLoading, error: errors } = useCompleteProfile();

  const handleSubmit = (values) => {
    return completeProfile("candidate", values);
  };

  return (
    <AuthPage
      config={candidateOnboardingConfig}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      apiError={errors}
    />
  );
};

export default CandidateOnboarding;
