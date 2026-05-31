"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

export const CandidateDashboardLoading = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white dark:bg-dark-primary-3 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border/50 flex flex-col items-center justify-center">
              <Skeleton shape="circle" size="3rem" className="dark:!bg-dark-primary-3 mb-4" />
              <Skeleton width="4rem" height="2rem" className="dark:!bg-dark-primary-3 mb-2" />
              <Skeleton width="6rem" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
          ))}
          <div className="bg-white dark:bg-dark-primary-3 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border/50 flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <Skeleton width="5rem" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="8rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="4rem" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="6rem" height="2rem" borderRadius="12px" className="dark:!bg-dark-primary-3 mt-2" />
            </div>
            <div className="shrink-0 flex flex-col items-center gap-2">
              <Skeleton width="4rem" height="4rem" borderRadius="16px" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-primary-3 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border/50">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="12rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
          </div>
          <Skeleton width="100%" height="300px" className="dark:!bg-dark-primary-3" />
        </div>

        <div className="bg-white dark:bg-dark-primary-3 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border/50">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="10rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
            </div>
            <Skeleton width="16rem" height="2.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" />
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-between py-4 px-6 border-b border-ui-borderLight dark:border-ui-border mb-2">
              <Skeleton width="20%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="15%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="15%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="10%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="10%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="10%" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
            
            <div className="flex flex-col">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-5 px-6 border-b border-ui-borderLight dark:border-ui-border/50">
                  <div className="w-[20%]"><Skeleton width="80%" height="1.2rem" className="dark:!bg-dark-primary-3" /></div>
                  <div className="w-[15%]"><Skeleton width="60%" height="1rem" className="dark:!bg-dark-primary-3" /></div>
                  <div className="w-[15%]"><Skeleton width="70%" height="1rem" className="dark:!bg-dark-primary-3" /></div>
                  <div className="w-[10%]"><Skeleton width="40%" height="1.2rem" className="dark:!bg-dark-primary-3" /></div>
                  <div className="w-[10%]"><Skeleton width="80%" height="1.5rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" /></div>
                  <div className="w-[10%]"><Skeleton width="60%" height="1.5rem" className="dark:!bg-dark-primary-3" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
