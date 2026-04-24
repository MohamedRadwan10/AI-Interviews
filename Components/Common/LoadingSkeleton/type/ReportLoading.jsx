"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

export const ReportLoading = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <Skeleton width="12rem" height="2.5rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
      </div>

      <div className="rounded-[20px] bg-white dark:bg-[#1a1d24] border border-ui-borderLight dark:border-ui-border/50 p-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 flex-1">
          <Skeleton shape="circle" size="6rem" className="dark:!bg-dark-primary-3 shrink-0" />
          <div className="flex-1 flex flex-col gap-3">
            <Skeleton width="40%" height="1.5rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="90%" height="2.5rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>
        <div className="flex items-center gap-8 shrink-0 w-full md:w-auto">
          <div className="hidden md:block w-px h-16 bg-ui-borderLight dark:bg-ui-border" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full md:w-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton width="3rem" height="0.75rem" className="dark:!bg-dark-primary-3 mb-1" />
                <Skeleton width="4rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="rounded-[20px] bg-white dark:bg-[#1a1d24] p-6 border border-ui-borderLight dark:border-ui-border/50 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Skeleton width="6rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between"><Skeleton width="4rem" /><Skeleton width="2rem" /></div>
                  <Skeleton width="100%" height="6px" className="dark:!bg-dark-primary-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[20px] bg-white dark:bg-[#1a1d24] border border-ui-borderLight dark:border-ui-border/50 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Skeleton width="60%" height="1.25rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="4rem" height="1.5rem" borderRadius="20px" className="dark:!bg-dark-primary-3" />
              </div>
              <Skeleton width="100%" height="3rem" className="dark:!bg-dark-primary-3" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] bg-white dark:bg-[#1a1d24] border border-ui-borderLight dark:border-ui-border/50 p-6">
        <Skeleton width="8rem" height="1.25rem" className="dark:!bg-dark-primary-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton width="100%" height="4rem" className="dark:!bg-dark-primary-3" />
          <Skeleton width="100%" height="4rem" className="dark:!bg-dark-primary-3" />
        </div>
      </div>
    </div>
  );
};
