import React from "react";
import { Skeleton } from "primereact/skeleton";

export const PostJobLoading = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-10">
        <Skeleton shape="circle" size="4rem" className="dark:!bg-dark-primary-3 shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton width="40%" height="2.5rem" className="dark:!bg-dark-primary-3" />
          <Skeleton width="60%" height="1.25rem" className="dark:!bg-dark-primary-3" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white dark:bg-dark-primary-3/20 rounded-2xl border border-ui-borderLight dark:border-dark-gray p-4 flex items-center gap-3 backdrop-blur-sm">
              <Skeleton shape="circle" size="2rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="60%" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-dark-primary-3/30 rounded-[2.5rem] border border-ui-borderLight dark:border-ui-border backdrop-blur-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-ui-borderLight dark:border-dark-gray bg-gray-50/50 dark:bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton shape="circle" size="3rem" className="dark:!bg-dark-primary-3" />
                <div className="space-y-2">
                  <Skeleton width="8rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton width="12rem" height="1rem" className="dark:!bg-dark-primary-3" />
                </div>
              </div>
              <Skeleton width="6rem" height="2rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`space-y-3 ${i === 1 || i === 4 ? "md:col-span-2" : ""}`}>
                  <Skeleton width="6rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton width="100%" height="3rem" borderRadius="0.75rem" className="dark:!bg-dark-primary-3/50" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center px-2 pt-4">
            <Skeleton width="10rem" height="3.5rem" borderRadius="1.25rem" className="dark:!bg-dark-primary-3" />
            <div className="flex gap-4">
              <Skeleton width="8rem" height="3.5rem" borderRadius="1.25rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="12rem" height="3.5rem" borderRadius="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
