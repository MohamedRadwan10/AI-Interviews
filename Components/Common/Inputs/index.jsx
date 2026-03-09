"use client";

import React, { Suspense } from "react";
import { get, startCase } from "lodash-es";
import * as FieldComponents from "@/Components/Common/Inputs/type";

const MainInput = (props) => {
  const { field_name } = props;
  const componentKey = `${startCase(field_name).replaceAll(" ", "")}Field`;
  const MainComp = get(
    FieldComponents,
    componentKey,
    FieldComponents.TextField,
  );

  return (
    <Suspense fallback={<div>Loading field...</div>}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default MainInput;
