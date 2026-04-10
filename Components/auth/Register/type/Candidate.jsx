"use client";
import AuthPage from "@/Components/auth/AuthPage";
import { registerConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const Candidate = () => {
  const { registerCandidate } = useAuth();

  return <AuthPage config={registerConfig} onSubmit={registerCandidate} />;
};

export default Candidate;

