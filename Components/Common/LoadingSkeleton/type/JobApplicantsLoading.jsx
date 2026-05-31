"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

export const JobApplicantsLoading = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white dark:bg-dark-primary-3 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border/50 flex justify-between items-center">
              <div className="space-y-3">
                <Skeleton width="6rem" height="1rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="4rem" height="2.5rem" className="dark:!bg-dark-primary-3" />
              </div>
              <Skeleton shape="circle" size="3.5rem" className="dark:!bg-dark-primary-3" />
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-primary-3 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border/50">
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-between py-4 px-6 border-b border-ui-borderLight dark:border-ui-border mb-2">
              <Skeleton width="25%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="20%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="20%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="15%" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
            
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center justify-between py-5 px-6 border-b border-ui-borderLight dark:border-ui-border/50 last:border-0">
                <div className="w-[25%] flex items-center gap-3">
                  <Skeleton shape="circle" size="2.5rem" className="dark:!bg-dark-primary-3" />
                  <div className="space-y-1 w-full">
                    <Skeleton width="70%" height="1rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="50%" height="0.7rem" className="dark:!bg-dark-primary-3" />
                  </div>
                </div>
                <div className="w-[20%]"><Skeleton width="40%" height="1.2rem" className="dark:!bg-dark-primary-3" /></div>
                <div className="w-[20%]"><Skeleton width="50%" height="1.2rem" borderRadius="1rem" className="dark:!bg-dark-primary-3" /></div>
                <div className="w-[15%]"><Skeleton width="100%" height="2.5rem" borderRadius="8px" className="dark:!bg-dark-primary-3" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
