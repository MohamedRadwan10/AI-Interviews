import React from "react";
import { Skeleton } from "primereact/skeleton";
import { JobCardLoading } from "./JobCard";

export const JobsLoading = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="text-center mb-10 space-y-6">
        <Skeleton width="40%" height="2.5rem" className="mx-auto dark:!bg-dark-primary-3" />
        <div className="flex justify-center max-w-3xl mx-auto gap-4">
          <Skeleton width="100%" height="3.5rem" borderRadius="0.75rem" className="dark:!bg-dark-primary-3" />
          <Skeleton width="8rem" height="3.5rem" borderRadius="0.75rem" className="dark:!bg-dark-primary-3" />
        </div>
      </div>

      <div className="mb-8">
        <Skeleton width="15rem" height="1.75rem" className="mb-6 dark:!bg-dark-primary-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardLoading key={i} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
        <Skeleton width="12rem" height="2.5rem" borderRadius="0.5rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="15rem" height="1rem" className="dark:!bg-dark-primary-3" />
      </div>
    </div>
  );
};
