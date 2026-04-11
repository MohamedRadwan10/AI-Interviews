import React from "react";
import { Skeleton } from "primereact/skeleton";

export const PageLoading = () => {
  return (
    <div className="w-full flex-col p-4 flex gap-6 mt-10">
      <Skeleton width="100%" height="150px" borderRadius="16px" className="mb-4 dark:!bg-dark-primary-3" />
      <div className="flex flex-col gap-4">
        <Skeleton width="80%" height="2rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="60%" height="2rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="40%" height="2rem" className="dark:!bg-dark-primary-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Skeleton width="100%" height="300px" borderRadius="16px" className="dark:!bg-dark-primary-3" />
          <Skeleton width="100%" height="300px" borderRadius="16px" className="dark:!bg-dark-primary-3" />
          <Skeleton width="100%" height="300px" borderRadius="16px" className="dark:!bg-dark-primary-3" />
      </div>
    </div>
  );
};
