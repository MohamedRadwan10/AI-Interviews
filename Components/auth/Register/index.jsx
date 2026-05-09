"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as FormComponents from "@/Components/auth/Register/type";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";

const RegisterPage = (props) => {
  const type = props?.type ?? "";
  const componentKey = `${startCase(type).replaceAll(" ", "")}Form`;

  const MainComp = get(
    FormComponents,
    componentKey,
    FormComponents.CandidateForm,
  );

  return (
    <Suspense fallback={<RouteLoading type="register" />}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default RegisterPage;
