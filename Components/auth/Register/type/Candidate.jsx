"use client";
import AuthPage from "@/Components/auth/AuthPage";
import { registerConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const Candidate = () => {
  const { registerCandidate, errors } = useAuth();

  return <AuthPage config={registerConfig} onSubmit={registerCandidate} apiError={errors} />;
};

export default Candidate;

