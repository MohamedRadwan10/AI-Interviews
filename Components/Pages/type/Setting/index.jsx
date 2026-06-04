"use client";
import React from "react";
import { get, startCase } from "lodash-es";
import * as PageComponents from "@/Components/Pages/type/Setting/type";

const MainSetting = (props) => {
  const type = get(props, "compType", "");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Setting`;

  const defaultSetting = get(PageComponents, "CandidateSetting");
  const MainComp = get(PageComponents, componentKey, defaultSetting);

  return <MainComp {...props} />;
};

export default MainSetting;
