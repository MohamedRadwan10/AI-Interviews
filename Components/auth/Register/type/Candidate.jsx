"use client";
import AuthPage from "@/Components/auth/AuthPage";
import { registerConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const Candidate = () => {
  const { registerCandidate, errors, isLoading } = useAuth();

  return <AuthPage config={registerConfig} onSubmit={registerCandidate} apiError={errors} isLoading={isLoading} />;
};

export default Candidate;

