"use client"; 
import AuthPage from "@/Components/auth/AuthPage";
import { loginConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { login, errors, isLoading } = useAuth();
  return <AuthPage config={loginConfig} onSubmit={login} apiError={errors} isLoading={isLoading} />;
};

export default LoginPage;
