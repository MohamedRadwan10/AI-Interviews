import RegisterPage from "@/Components/auth/Register";
import React from "react";
import RoleGuard from "@/Components/Common/RoleGuard";

export const metadata = {
  title: "Company Registration | IntelliHire",
  description: "Register your company on IntelliHire to find and hire top talent using AI interviews.",
};

const Page = () => {
  return (
    <RoleGuard allowedRoles={["Company"]}>
      <div>
        <RegisterPage type={'company'}/>
      </div>
    </RoleGuard>
  );
};

export default Page;
