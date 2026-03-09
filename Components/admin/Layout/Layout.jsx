import React from "react";
import TopBar from "./AppTopbar";
import AppFooter from "./AppFooter";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-dark-primary-1 bg-light-primary">
      <TopBar />
      <main className="">{children}</main>
      {/* <AppFooter /> */}
    </div>
  );
};

export default Layout;
