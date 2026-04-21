import React from "react";
import { Skeleton } from "primereact/skeleton";

export const InterviewRoomLoading = () => {
  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-100px)] animate-pulse">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white dark:bg-dark-primary-4 p-6 rounded-3xl border border-ui-borderLight dark:border-ui-border h-full">
          <Skeleton width="100%" height="200px" borderRadius="1.5rem" className="mb-6 dark:!bg-dark-primary-3" />
          <Skeleton width="100%" height="4rem" borderRadius="1rem" className="mb-4 dark:!bg-dark-primary-3" />
          <div className="space-y-3">
             <Skeleton width="80%" height="1.25rem" className="dark:!bg-dark-primary-3" />
             <Skeleton width="60%" height="1.25rem" className="dark:!bg-dark-primary-3" />
          </div>
          <div className="mt-8 pt-8 border-t border-ui-borderLight dark:border-ui-border">
             <Skeleton width="50%" height="1.5rem" className="mb-4 dark:!bg-dark-primary-3" />
             <Skeleton width="100%" height="0.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-9 flex flex-col gap-6 h-full">
        <div className="bg-white dark:bg-dark-primary-4 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-sm">
          <Skeleton width="6rem" height="1.5rem" className="mb-4 dark:!bg-dark-primary-3" />
          <div className="space-y-3">
            <Skeleton width="100%" height="2.5rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="80%" height="2.5rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-dark-primary-4 p-6 rounded-3xl border border-ui-borderLight dark:border-ui-border">
          <div className="flex gap-4 mb-6">
             <Skeleton width="6rem" height="2.5rem" borderRadius="2rem" className="dark:!bg-dark-primary-3" />
             <Skeleton width="6rem" height="2.5rem" borderRadius="2rem" className="dark:!bg-dark-primary-3" />
             <Skeleton width="6rem" height="2.5rem" borderRadius="2rem" className="dark:!bg-dark-primary-3" />
          </div>
          <Skeleton width="100%" height="250px" borderRadius="1.5rem" className="dark:!bg-dark-primary-3" />
          <div className="flex justify-end mt-6">
             <Skeleton width="10rem" height="3.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>

        <div className="flex justify-between items-center bg-white/50 dark:bg-dark-primary-4/50 backdrop-blur-md p-4 rounded-3xl border border-ui-borderLight dark:border-ui-border">
          <Skeleton width="10rem" height="1rem" className="dark:!bg-dark-primary-3" />
        </div>
      </div>
    </div>
  );
};
