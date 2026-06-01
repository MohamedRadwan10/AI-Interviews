import React from "react";
import { map } from "lodash-es";
import { Skeleton } from "primereact/skeleton";

export const NotificationItemsLoading = () => {
  return (
    <div className="space-y-4 w-full">
      {map(Array.from({ length: 5 }), (_, index) => (
        <div key={index} className="p-4 rounded-xl border border-ui-borderLight dark:border-dark-primary-3 bg-white dark:bg-dark-primary-3/50 flex gap-4 items-start">
          <Skeleton shape="circle" size="2.5rem" className="shrink-0 dark:!bg-dark-primary-4" />
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2 mb-2">
              <Skeleton width="33%" height="1.5rem" className="dark:!bg-dark-primary-4" />
              <Skeleton width="5rem" height="1rem" className="dark:!bg-dark-primary-4" />
            </div>
            <Skeleton width="66%" height="0.75rem" className="mb-2 dark:!bg-dark-primary-4" />
            <Skeleton width="50%" height="0.75rem" className="dark:!bg-dark-primary-4" />
          </div>
          <Skeleton width="2rem" height="2rem" borderRadius="0.5rem" className="shrink-0 dark:!bg-dark-primary-4" />
        </div>
      ))}
    </div>
  );
};

export const NotificationLoading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Skeleton width="12rem" height="2.5rem" borderRadius="0.5rem" className="mb-8 dark:!bg-dark-primary-3" />
      
      <div className="flex justify-between items-center mb-6">
        <Skeleton width="8rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="9rem" height="2.5rem" borderRadius="0.5rem" className="dark:!bg-dark-primary-3" />
      </div>

      <NotificationItemsLoading />
    </div>
  );
};
