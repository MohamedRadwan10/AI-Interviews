"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as FormComponents from "@/Components/Common/Cards/type/index";

const MainCard = (props) => {
  const type = get(props, "type", "");
  const data = get(props, "data");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Card`;

  const FeatureCard = get(FormComponents, "FeatureCard");
  const MainComp = get(FormComponents, componentKey, FeatureCard);

  return (
    <Suspense fallback={<div>loading .....</div>}>
      <MainComp {...props} {...(data || {})} item={data} />
    </Suspense>
  );
};

export default MainCard;
