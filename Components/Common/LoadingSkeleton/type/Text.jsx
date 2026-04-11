import React from "react";
import { Skeleton } from "primereact/skeleton";

export const TextLoading = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton width="100%" height="1rem" className="dark:!bg-dark-primary-3" />
      <Skeleton width="80%" height="1rem" className="dark:!bg-dark-primary-3" />
      <Skeleton width="60%" height="1rem" className="dark:!bg-dark-primary-3" />
    </div>
  );
};
