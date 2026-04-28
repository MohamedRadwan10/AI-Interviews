import React from "react";
import MainPage from "@/Components/Pages";
import RoleGuard from "@/Components/Common/RoleGuard";

export const metadata = {
  title: "Active Sessions | IntelliHire",
  description: "View and manage your ongoing AI interview sessions.",
};

const Page = () => {
  return (
    <RoleGuard allowedRoles={["Individual"]}>
      <MainPage type="activeSessions" />
    </RoleGuard>
  );
};

export default Page;
