"use client";

import { get, startCase } from "lodash-es";
import * as PageComponents from "@/Components/Pages/type/Dashboard/type";

const MainCard = (props) => {
  const type = get(props, "compType", "");
  const data = get(props, "data");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Dashboard`;

  const defaultDashboard = get(PageComponents, "CandidateDashboard");
  const MainComp = get(PageComponents, componentKey, defaultDashboard);

  return <MainComp {...props} {...(data || {})} item={data} />;
};

export default MainCard;
