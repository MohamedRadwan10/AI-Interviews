import React from "react";
import { Skeleton } from "primereact/skeleton";
import { JobCardLoading } from "./JobCard";

export const HomeLoading = () => {
  return (
    <div className="space-y-20">
      <section className="pt-24 pb-48 text-center px-6">
        <div className="container mx-auto max-w-4xl space-y-6">
          <Skeleton width="70%" height="4rem" className="mx-auto dark:!bg-dark-primary-3" />
          <Skeleton width="50%" height="2.5rem" className="mx-auto dark:!bg-dark-primary-3" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton width="100%" height="1.25rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="90%" height="1.25rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="80%" height="1.25rem" className="mx-auto dark:!bg-dark-primary-3" />
          </div>
          <Skeleton width="12rem" height="3.5rem" borderRadius="2rem" className="mx-auto mt-10 dark:!bg-dark-primary-3" />
        </div>
      </section>

      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto">
          <div className="mb-10 space-y-2">
            <Skeleton width="15rem" height="2.25rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="20rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobCardLoading key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto bg-blue-50/50 dark:bg-dark-primary-3/30 rounded-[2.5rem] p-8 md:p-16 border border-blue-100/50 dark:border-gray-800 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton width="80%" height="3rem" className="dark:!bg-dark-primary-3" />
              <div className="space-y-2">
                <Skeleton width="100%" height="1.25rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="90%" height="1.25rem" className="dark:!bg-dark-primary-3" />
              </div>
              <div className="space-y-4 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton shape="circle" size="1.25rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="60%" height="1.25rem" className="dark:!bg-dark-primary-3" />
                  </div>
                ))}
              </div>
              <Skeleton width="14rem" height="4rem" borderRadius="2rem" className="mt-8 dark:!bg-dark-primary-3" />
            </div>
            <Skeleton width="100%" height="300px" borderRadius="1.5rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>
      </section>
    </div>
  );
};
