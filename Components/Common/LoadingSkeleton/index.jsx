import React from "react";
import { get, startCase } from "lodash-es";
import * as LoadingComponents from "@/Components/Common/LoadingSkeleton/type/index";

const DefaultLoading = () => (
  <div className="p-4 w-full h-20 animate-pulse bg-light-main dark:bg-dark-primary-3 rounded-lg" />
);

const Loading = ({ type = "default", className = "" }) => {
  const componentKey = `${startCase(type).replaceAll(" ", "")}Loading`;
  
  const MainComp = get(LoadingComponents, componentKey, DefaultLoading);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <MainComp />
    </div>
  );
};

export default Loading;
