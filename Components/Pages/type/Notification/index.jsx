"use client";

import { get, startCase } from "lodash-es";
import * as PageComponents from "@/Components/Pages/type/Notification/comps";

const MainNotification = (props) => {
  const type = get(props, "compType", "");
  const data = get(props, "data");
  const componentKey = `${startCase(type).replaceAll(" ", "")}`;

  const defaultNotification = get(PageComponents, "CandidateNotification");
  const MainComp = get(PageComponents, componentKey, defaultNotification);

  return <div className="w-full px-4 sm:px-6 md:px-24 py-10"> <MainComp {...props} {...(data || {})} item={data} /></div>;
};

export default MainNotification;
