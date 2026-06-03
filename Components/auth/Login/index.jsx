"use client"; 
import AuthPage from "@/Components/auth/AuthPage";
import { loginConfig } from "@/Config/FieldsConfig";
import { useLogin } from "@/hooks/useAuth";

const LoginPage = () => {
  const { login, error: errors, isLoading } = useLogin();
  return <AuthPage type="login" config={loginConfig} onSubmit={login} apiError={errors} isLoading={isLoading} />;
};



export default LoginPage;
