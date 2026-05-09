"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as OnboardingComponents from "@/Components/auth/Onboarding/comps";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

const OnboardingPage = (props) => {
  const type = props?.type ?? "candidate";
  const componentKey = `${startCase(type).replaceAll(" ", "")}Onboarding`;

  const MainComp = get(
    OnboardingComponents,
    componentKey,
    OnboardingComponents.CandidateOnboarding
  );

  return (
    <Suspense fallback={<RouteLoading type="onboarding" />}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default OnboardingPage;
