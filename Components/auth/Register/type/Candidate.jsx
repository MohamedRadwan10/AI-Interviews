import AuthPage from "@/Components/auth/AuthPage";
import { registerConfig } from "@/Config/FieldsConfig";

const Candidate = () => {
  return <AuthPage config={registerConfig} />;
};

export default Candidate;
