import RegisterPage from "@/Components/auth/Register";
import React from "react";
import RoleGuard from "@/Components/Common/RoleGuard";

export const metadata = {
  title: "Candidate Registration | IntelliHire",
  description: "Create a candidate account on IntelliHire to start practicing interviews.",
};

const Page = () => {
  return (
    <RoleGuard allowedRoles={["Individual"]}>
      <div>
        <RegisterPage type={'candidate'}/>
      </div>
    </RoleGuard>
  );
};

export default Page;
