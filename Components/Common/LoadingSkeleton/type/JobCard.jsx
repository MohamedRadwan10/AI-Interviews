import React from "react";
import { Skeleton } from "primereact/skeleton";

export const JobCardLoading = () => {
  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm h-full w-full">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width="3rem" height="3rem" borderRadius="12px" className="dark:!bg-dark-primary-3 shrink-0" />
        <div className="flex flex-col gap-2 flex-1 mt-1">
          <Skeleton width="60%" height="1.25rem" className="dark:!bg-dark-primary-3" />
          <Skeleton width="80%" height="1rem" className="dark:!bg-dark-primary-3" />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Skeleton width="5rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="6rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
      </div>

      <div className="flex gap-2 mb-6 mt-2">
        <Skeleton width="4rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="5rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="4.5rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-ui-borderLight dark:border-ui-border mt-auto">
        <Skeleton width="5rem" height="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="4rem" height="1rem" className="dark:!bg-dark-primary-3" />
      </div>
    </div>
  );
};
