import React from "react";
import { get, startCase } from "lodash-es";
import * as LoadingComponents from "@/Components/Common/Loading/type/index";

const Loading = ({ type = "default", className = "" }) => {
  const componentKey = `${startCase(type).replaceAll(" ", "")}Loading`;
  
  const DefaultComponent = get(LoadingComponents, "DefaultLoading");
  const MainComp = get(LoadingComponents, componentKey, DefaultComponent);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
        <Suspense fallback={<DefaultComponent />}>
          <MainComp {...props} />
        </Suspense>
    </div>
  );
};

export default Loading;
