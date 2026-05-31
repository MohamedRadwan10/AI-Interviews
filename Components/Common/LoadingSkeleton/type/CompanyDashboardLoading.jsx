"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

export const CompanyDashboardLoading = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-2">
            <Skeleton width="15rem" height="2.5rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="25rem" height="1.2rem" className="dark:!bg-dark-primary-3" />
          </div>
          <Skeleton width="10rem" height="3rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
        </div>

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
          <div className="flex justify-between items-center mb-8">
            <Skeleton width="12rem" height="1.8rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="15rem" height="2.5rem" borderRadius="2rem" className="dark:!bg-dark-primary-3" />
          </div>
          
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-between py-4 px-6 border-b border-ui-borderLight dark:border-ui-border mb-2">
              <Skeleton width="30%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="20%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="20%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="15%" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
            
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between py-6 px-6 border-b border-ui-borderLight dark:border-ui-border/50 last:border-0">
                <div className="w-[30%] space-y-2">
                  <Skeleton width="70%" height="1.2rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton width="50%" height="0.8rem" className="dark:!bg-dark-primary-3" />
                </div>
                <div className="w-[20%]"><Skeleton width="60%" height="1rem" className="dark:!bg-dark-primary-3" /></div>
                <div className="w-[20%]"><Skeleton width="40%" height="1.2rem" className="dark:!bg-dark-primary-3" /></div>
                <div className="w-[15%] flex gap-3">
                  <Skeleton shape="circle" size="2rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton shape="circle" size="2rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton shape="circle" size="2rem" className="dark:!bg-dark-primary-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
