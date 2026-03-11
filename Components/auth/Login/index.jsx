import AuthPage from "@/Components/auth/AuthPage";
import { loginConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  return <AuthPage config={loginConfig} onSubmit={login} />;
};

export default LoginPage;
