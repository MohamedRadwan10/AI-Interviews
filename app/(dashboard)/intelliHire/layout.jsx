import Layout from "@/Components/admin/Layout/Layout";
import { DarkModeProvider } from "@/Context/DarkModeContext";
import { ReduxProvider } from "@/Store/ReduxProvider";

const MainLayout = ({ children }) => {
  return (
    <DarkModeProvider>
      <ReduxProvider>
        <Layout>{children}</Layout>
      </ReduxProvider>
    </DarkModeProvider>
  );
};

export default MainLayout;
