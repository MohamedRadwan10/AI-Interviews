"use client";

import { get, startCase } from "lodash-es";
import * as PageComponents from "@/Components/Pages/type/index";

const MainPage = (props) => {
  const type = get(props, "type", "");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Page`;

  const HomePage = get(PageComponents, "HomePage");
  const MainComp = get(PageComponents, componentKey, HomePage);

  return <MainComp {...props} />;
};

export default MainPage;
