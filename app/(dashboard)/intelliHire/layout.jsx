"use client";
import Layout from "@/Components/admin/Layout/Layout";
import { ReduxProvider } from "@/Store/ReduxProvider";

const MainLayout = ({ children }) => {
  return (
      <ReduxProvider>
        <Layout>{children}</Layout>
      </ReduxProvider>
  );
};

export default MainLayout;
