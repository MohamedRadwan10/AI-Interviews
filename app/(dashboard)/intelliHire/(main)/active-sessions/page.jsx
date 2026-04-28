import React from "react";
import MainPage from "@/Components/Pages";

export const metadata = {
  title: "Active Sessions | IntelliHire",
  description: "View and manage your ongoing AI interview sessions.",
};

const Page = () => {
  return <MainPage type="activeSessions" />;
};

export default Page;
