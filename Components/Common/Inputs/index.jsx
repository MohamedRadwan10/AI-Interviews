"use client";

import React, { Suspense } from "react";
import { get, startCase } from "lodash-es";
import * as FieldComponents from "@/Components/Common/Inputs/type";
import Loading from "@/Components/Common/LoadingSkeleton";

const MainInput = (props) => {
  const type = get(props, "type", "text");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Field`;

  const TextField = get(FieldComponents, "TextField");
  const MainComp = get(FieldComponents, componentKey, TextField);

  return (
    <Suspense fallback={<Loading type="field" />}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default MainInput;
