import React from "react";
import { Skeleton } from "primereact/skeleton";

export const AccountTypeLoading = () => {
  return (
    <div className="min-h-screen dark:bg-dark-primary-1 bg-light-primary flex flex-col items-center justify-center px-6 space-y-4">
      <Skeleton width="20rem" height="2.5rem" className="mb-2 dark:!bg-dark-primary-3" />
      <Skeleton width="15rem" height="1.25rem" className="mb-10 dark:!bg-dark-primary-3" />
      
      <div className="flex gap-6 flex-wrap justify-center">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="w-80 h-48 p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center space-y-4">
            <Skeleton shape="circle" size="3rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="60%" height="1.5rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="100%" height="2.5rem" className="dark:!bg-dark-primary-3" />
          </div>
        ))}
      </div>

      <Skeleton width="12rem" height="3.5rem" borderRadius="0.5rem" className="mt-10 dark:!bg-dark-primary-3" />
      <Skeleton width="8rem" height="1.25rem" className="mt-4 dark:!bg-dark-primary-3" />
    </div>
  );
};
