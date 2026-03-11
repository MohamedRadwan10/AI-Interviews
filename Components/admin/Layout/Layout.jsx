import React from "react";
import TopBar from "./AppTopbar";
import AppFooter from "./AppFooter";
import ProtectedRouter from "./Protected/ProtectedRoute";

const Layout = ({ children }) => {
  return (
    <ProtectedRouter>
      <div className="min-h-screen flex flex-col dark:bg-dark-primary-1 bg-light-primary">
        <TopBar />
        <main className="">{children}</main>
        {/* <AppFooter /> */}
      </div>
    </ProtectedRouter>
  );
};

export default Layout;
