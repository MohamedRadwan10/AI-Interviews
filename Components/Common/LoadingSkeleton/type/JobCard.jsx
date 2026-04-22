import React from "react";
import { Skeleton } from "primereact/skeleton";

export const JobCardLoading = () => {
  return (
    <div className="flex flex-col justify-between p-6 rounded-[2rem] bg-white dark:bg-dark-primary-4 border border-light-blue100/50 dark:border-ui-border shadow-sm h-full w-full">
      <div className="flex items-start gap-4 mb-6">
        <Skeleton size="3.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3 shrink-0" />
        <div className="flex flex-col gap-3 flex-1 mt-1">
          <Skeleton width="70%" height="1.5rem" borderRadius="0.5rem" className="dark:!bg-dark-primary-3" />
          <Skeleton width="40%" height="1rem" borderRadius="0.4rem" className="dark:!bg-dark-primary-3" />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Skeleton width="5rem" height="1.75rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="6rem" height="1.75rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8 mt-2">
        <Skeleton width="4rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="5.5rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="4.5rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-light-blue100/50 dark:border-ui-border mt-auto">
        <Skeleton width="6rem" height="1.25rem" borderRadius="0.4rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="5rem" height="1.25rem" borderRadius="0.4rem" className="dark:!bg-dark-primary-3" />
      </div>
    </div>
  );
};
