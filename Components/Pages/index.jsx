"use client";
import React, { useMemo } from "react";
import { get, startCase } from "lodash-es";
import * as PageComponents from "@/Components/Pages/type/index";

const MainPage = (props) => {
  const type = get(props, "type", "");

  const MainComp = useMemo(() => {
    const componentKey = `${startCase(type).replaceAll(" ", "")}Page`;
    const HomePage = get(PageComponents, "HomePage");
    return get(PageComponents, componentKey, HomePage);
  }, [type]);

  return <MainComp {...props} />;
};

export default MainPage;
