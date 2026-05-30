import RegisterPage from "@/Components/auth/Register";
import React from "react";

export const metadata = {
  title: "Candidate Registration | IntelliHire",
  description: "Create a candidate account on IntelliHire to start practicing interviews.",
};

const Page = () => {
  return (
    <div>
      <RegisterPage type={'candidate'}/>
    </div>
  );
};

export default Page;
