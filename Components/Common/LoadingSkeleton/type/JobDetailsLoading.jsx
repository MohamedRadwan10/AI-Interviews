import React from "react";
import { Skeleton } from "primereact/skeleton";

export const JobDetailsLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm">
        <div className="flex items-start gap-6">
          <Skeleton width="5rem" height="5rem" borderRadius="16px" className="dark:!bg-dark-primary-3" />
          <div className="flex-1 space-y-3">
            <Skeleton width="40%" height="2rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="60%" height="1.25rem" className="dark:!bg-dark-primary-3" />
            <div className="flex gap-4 pt-2">
              <Skeleton width="6rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="6rem" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton width="3rem" height="0.75rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="70%" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm space-y-8">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton width="8rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
            <div className="space-y-2">
              <Skeleton width="100%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="95%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="90%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="60%" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
