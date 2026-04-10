"use client";
import AuthPage from "@/Components/auth/AuthPage";
import { companyRegisterConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const Company = () => {
  const { registerCompany, errors } = useAuth();
  return <AuthPage config={companyRegisterConfig} onSubmit={registerCompany} apiError={errors} />;
};

export default Company;

