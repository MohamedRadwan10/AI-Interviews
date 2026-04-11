"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as FormComponents from "@/Components/auth/Register/type";
import Loading from "@/Components/Common/LoadingSkeleton";

const RegisterPage = (props) => {
  const type = props?.type ?? "";
  const componentKey = `${startCase(type).replaceAll(" ", "")}Form`;

  const MainComp = get(
    FormComponents,
    componentKey,
    FormComponents.CandidateForm,
  );

  return (
    <Suspense fallback={<Loading type="page" />}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default RegisterPage;
