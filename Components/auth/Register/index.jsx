"use client";

import { get, startCase } from "lodash-es";
import { Suspense } from "react";
import * as CardComponents from "@/Components/auth/Register/type";
import Loading from "@/MainApp/Components/Loading";

const SettingComponent = (props) => {
  const cardName = props?.card_name ?? "";
  const componentKey = `${startCase(cardName).replaceAll(" ", "")}Card`;

  const MainComp = get(
    CardComponents,
    componentKey,
    CardComponents.CandidateCard,
  );

  return (
    <Suspense fallback={<Loading />}>
      <MainComp {...props} />
    </Suspense>
  );
};

export default SettingComponent;
