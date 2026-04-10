import React from "react";
import { Skeleton } from "primereact/skeleton";

export const CardLoading = () => {
  return (
    <div className="w-full h-full border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" size="3rem" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton width="70%" className="mb-1" />
          <Skeleton width="40%" />
        </div>
      </div>
      <Skeleton width="100%" height="100px" className="mt-2" />
      <div className="flex justify-between items-center mt-2">
          <Skeleton width="30%" height="2rem" />
          <Skeleton width="20%" height="2rem" borderRadius="20px" />
      </div>
    </div>
  );
};
