"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as PageComponents from "@/Components/Pages/type/index";
import Loading from "@/Components/Common/LoadingSkeleton";

const MainPage = (props) => {
  const type = get(props, "type", "");
  const componentKey = `${startCase(type).replaceAll(" ", "")}Page`;

  const HomePage = get(PageComponents, "HomePage");
  const MainComp = get(PageComponents, componentKey, HomePage);

  return (
    <Suspense fallback={<Loading type="page" />}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default MainPage;
