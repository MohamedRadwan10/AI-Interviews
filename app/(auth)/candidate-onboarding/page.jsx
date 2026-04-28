"use client";

import OnboardingPage from "@/Components/auth/Onboarding";
import React from "react";
import RoleGuard from "@/Components/Common/RoleGuard";

const page = () => {
  return (
    <RoleGuard allowedRoles={["Individual"]}>
      <div>
        <OnboardingPage type={'candidate'}/>
      </div>
    </RoleGuard>
  );
};

export default page;
