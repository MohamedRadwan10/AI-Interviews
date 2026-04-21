import React from "react";
import { Skeleton } from "primereact/skeleton";

export const InterviewInstructionsLoading = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-7xl mx-auto p-6 animate-pulse">
      <div className="flex-1">
        <div className="bg-white dark:bg-dark-primary-4 p-10 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm min-h-[550px] flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
             <Skeleton size="3rem" borderRadius="0.75rem" className="dark:!bg-dark-primary-3" />
             <Skeleton width="15rem" height="2rem" className="dark:!bg-dark-primary-3" />
          </div>
          
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton shape="circle" size="2rem" className="flex-shrink-0 dark:!bg-dark-primary-3" />
                <div className="flex-1 space-y-2">
                  <Skeleton width="100%" height="1rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton width="60%" height="1rem" className="dark:!bg-dark-primary-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[450px]">
        <div className="bg-white dark:bg-dark-primary-4 p-10 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm h-full flex flex-col">
          <Skeleton width="60%" height="1.5rem" className="mb-8 dark:!bg-dark-primary-3" />
          
          <div className="aspect-[4/3] rounded-2xl border border-ui-borderLight dark:border-ui-border mb-8 overflow-hidden">
             <Skeleton width="100%" height="100%" className="dark:!bg-dark-primary-3" />
          </div>

          <div className="space-y-4">
             <Skeleton width="100%" height="2rem" borderRadius="0.5rem" className="dark:!bg-dark-primary-3" />
             <Skeleton width="100%" height="4rem" borderRadius="1.5rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
