"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as PageComponents from "@/Components/Pages/type/Dashboard/type";
import Loading from "@/Components/Common/LoadingSkeleton";

const MainCard = (props) => {
  const type = get(props, "compType", "");
  const data = get(props, "data");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Dashboard`;

  const defaultDashboard = get(PageComponents, "CandidateDashboard");
  const MainComp = get(PageComponents, componentKey, defaultDashboard);

  return (
    <Suspense fallback={<Loading type="CandidateDashboard" />}>
      <MainComp {...props} {...(data || {})} item={data} />
    </Suspense>
  );
};

export default MainCard;
