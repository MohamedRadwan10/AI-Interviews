"use client";
import AuthPage from "@/Components/auth/AuthPage";
import { registerConfig } from "@/Config/FieldsConfig";
import { useRegister } from "@/hooks/useAuth";

const Candidate = () => {
  const { registerCandidate, error: errors, isLoading } = useRegister();

  return <AuthPage config={registerConfig} onSubmit={registerCandidate} apiError={errors} isLoading={isLoading} />;
};

export default Candidate;

