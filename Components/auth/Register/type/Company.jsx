"use client";
import AuthPage from "@/Components/auth/AuthPage";
import { companyRegisterConfig } from "@/Config/FieldsConfig";
import { useRegister } from "@/hooks/useAuth";

const Company = () => {
  const { registerCompany, error: errors, isLoading } = useRegister();
  return <AuthPage config={companyRegisterConfig} onSubmit={registerCompany} apiError={errors} isLoading={isLoading} />;
};

export default Company;

