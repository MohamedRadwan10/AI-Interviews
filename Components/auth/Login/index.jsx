import AuthPage from "@/Components/auth/AuthPage";
import { loginConfig } from "@/Config/FieldsConfig";

const LoginPage = () => {
  return <AuthPage config={loginConfig} />;
};

export default LoginPage;
