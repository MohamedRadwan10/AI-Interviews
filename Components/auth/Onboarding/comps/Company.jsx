"use client";
import React, { useState } from "react";
import { companyOnboardingConfig } from "@/Config/FieldsConfig";
import { useCompleteProfile } from "@/hooks/useAuth";
import AuthPage from "@/Components/auth/AuthPage";

const CompanyOnboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { completeProfile, isLoading, error: errors } = useCompleteProfile();

  const handleNext = (values) => {
    const newData = { ...formData, ...values };
    setFormData(newData);
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      return completeProfile("company", newData);
    }
  };

  const getStepConfig = () => {
    switch (step) {
      case 1: return companyOnboardingConfig.info;
      case 2: return companyOnboardingConfig.details;
      case 3: return companyOnboardingConfig.location;
      default: return companyOnboardingConfig.info;
    }
  };

  return (
    <AuthPage
      config={getStepConfig()}
      onSubmit={handleNext}
      isLoading={isLoading}
      apiError={errors}
    />
  );
};

export default CompanyOnboarding;
