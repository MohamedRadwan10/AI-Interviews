"use client";
import Layout from "@/Components/admin/Layout/Layout";
import { UserTokenProvider } from "@/Context/UserTokenContext";
import { ReduxProvider } from "@/Store/ReduxProvider";

const MainLayout = ({ children }) => {
  return (
    <UserTokenProvider>
      <ReduxProvider>
        <Layout>{children}</Layout>
      </ReduxProvider>
    </UserTokenProvider>
  );
};

export default MainLayout;
