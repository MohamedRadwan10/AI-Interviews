"use client";

import OnboardingPage from "@/Components/auth/Onboarding";
import React from "react";
import RoleGuard from "@/Components/Common/RoleGuard";

const page = () => {
  return (
    <RoleGuard allowedRoles={["Company"]}>
      <div>
        <OnboardingPage type={'company'}/>
      </div>
    </RoleGuard>
  );
};

export default page;
