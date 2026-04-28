import RegisterPage from "@/Components/auth/Register";
import React from "react";

export const metadata = {
  title: "Company Registration | IntelliHire",
  description: "Register your company on IntelliHire to find and hire top talent using AI interviews.",
};

const Page = () => {
  return (
    <div>
      <RegisterPage type={'company'}/>
    </div>
  );
};

export default Page;
