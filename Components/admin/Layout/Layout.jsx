import React, { lazy, Suspense } from "react";
import TopBar from "@/Components/admin/Layout/AppTopbar";
import ProtectedRouter from "@/Components/admin/Layout/Protected/ProtectedRoute";

const AppFooter = lazy(() => import("./AppFooter"));

const Layout = ({ children }) => {
  return (
    <ProtectedRouter>
      <div className="min-h-screen flex flex-col dark:bg-dark-primary-1 bg-light-primary px-4 md:px-12 overflow-x-hidden">
        <TopBar />
        <main className="flex-1">{children}</main>
        <Suspense fallback={<div className="h-20" />}>
          <AppFooter />
        </Suspense>
      </div>
    </ProtectedRouter>
  );
};

export default Layout;
