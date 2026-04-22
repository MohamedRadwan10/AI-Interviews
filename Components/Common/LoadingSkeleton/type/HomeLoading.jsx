import React from "react";
import { Skeleton } from "primereact/skeleton";
import { JobCardLoading } from "./JobCard";

export const HomeLoading = () => {
  return (
    <div className="space-y-24">
      <section className="relative pt-24 pb-48 text-center px-6 overflow-hidden">
        <div className="container mx-auto max-w-4xl space-y-8 relative z-10">
          <Skeleton width="80%" height="4.5rem" className="mx-auto dark:!bg-dark-primary-3" />
          <Skeleton width="50%" height="2.5rem" className="mx-auto dark:!bg-dark-primary-3" />
          <div className="space-y-3 max-w-2xl mx-auto pt-4">
            <Skeleton width="100%" height="1.25rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="90%" height="1.25rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="60%" height="1.25rem" className="mx-auto dark:!bg-dark-primary-3" />
          </div>
          <Skeleton width="14rem" height="4rem" borderRadius="2rem" className="mx-auto mt-12 dark:!bg-dark-primary-3 shadow-lg" />
        </div>
      </section>

      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-3">
              <Skeleton width="18rem" height="2.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="22rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobCardLoading key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto bg-light-blue50/50 dark:bg-dark-primary-3/30 rounded-[3rem] p-8 md:p-20 border border-light-blue100/50 dark:border-ui-border backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Skeleton width="90%" height="3.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="100%" height="4rem" className="dark:!bg-dark-primary-3" />
              <div className="space-y-4 pt-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="70%" height="1.5rem" className="dark:!bg-dark-primary-3" />
                  </div>
                ))}
              </div>
              <Skeleton width="16rem" height="4.5rem" borderRadius="2.25rem" className="mt-10 dark:!bg-dark-primary-3 shadow-xl" />
            </div>
            <Skeleton width="100%" height="450px" borderRadius="2.5rem" className="dark:!bg-dark-primary-3 shadow-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
};
