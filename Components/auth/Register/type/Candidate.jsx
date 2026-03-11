"useClient";
import AuthPage from "@/Components/auth/AuthPage";
import { registerConfig } from "@/Config/FieldsConfig";
import { useAuth } from "@/hooks/useAuth";

const Candidate = () => {
  const { register } = useAuth();

  return <AuthPage config={registerConfig} onSubmit={register} />;
};

export default Candidate;
