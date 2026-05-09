"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

export const ReportLoading = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col">
      {/* Header Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton width="18rem" height="2rem" className="dark:!bg-dark-primary-3" />
          <Skeleton width="12rem" height="1rem" className="dark:!bg-dark-primary-3" />
        </div>
        <Skeleton width="10rem" height="3rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
      </div>

      {/* Profile & Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Candidate Info Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
          <div className="flex flex-col sm:flex-row gap-6">
            <Skeleton shape="circle" size="6rem" className="dark:!bg-dark-primary-3 shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton width="12rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="5rem" height="1.25rem" borderRadius="20px" className="dark:!bg-dark-primary-3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="8rem" height="1rem" className="dark:!bg-dark-primary-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Score Skeleton */}
        <div className="bg-brand-primary/20 dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <Skeleton width="6rem" height="1rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="4rem" height="1.25rem" borderRadius="8px" className="dark:!bg-dark-primary-3" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton width="4rem" height="2.5rem" className="dark:!bg-dark-primary-3" />
            <div className="flex-1">
              <Skeleton width="100%" height="0.5rem" borderRadius="10px" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
          <Skeleton width="100%" height="1rem" className="mt-4 dark:!bg-dark-primary-3" />
        </div>
      </div>

      {/* Detailed Metrics Skeleton */}
      <div className="bg-white dark:bg-dark-primary-4 rounded-[24px] p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative flex-shrink-0">
             <Skeleton shape="circle" size="10rem" className="dark:!bg-dark-primary-3" />
          </div>
          <div className="flex-1 space-y-6 w-full">
            <div className="space-y-3">
              <Skeleton width="10rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="100%" height="3rem" className="dark:!bg-dark-primary-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2 text-center md:text-left">
                  <Skeleton width="3rem" height="0.75rem" className="mx-auto md:mx-0 dark:!bg-dark-primary-3" />
                  <Skeleton width="5rem" height="1.25rem" className="mx-auto md:mx-0 dark:!bg-dark-primary-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Skeletons */}
        <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-6">
          {/* Recommendation Skeleton */}
          <div className="bg-white dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 space-y-4">
            <Skeleton width="60%" height="1.5rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="100%" height="4rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
            <div className="space-y-2">
              <Skeleton width="100%" height="2rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="100%" height="2rem" className="dark:!bg-dark-primary-3" />
            </div>
          </div>

          {/* Skill Analysis Skeleton */}
          <div className="bg-white dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 space-y-6">
            <div className="space-y-4">
              <Skeleton width="50%" height="1.25rem" className="dark:!bg-dark-primary-3" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton width="4rem" height="0.75rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="2rem" height="0.75rem" className="dark:!bg-dark-primary-3" />
                  </div>
                  <Skeleton width="100%" height="6px" borderRadius="10px" className="dark:!bg-dark-primary-3" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-4 border-t border-ui-borderLight dark:border-ui-border/50">
              <Skeleton width="100%" height="4rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
              <Skeleton width="100%" height="4rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
            </div>
          </div>
        </div>

        {/* Question List Skeleton */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 space-y-4">
              <div className="flex justify-between items-start">
                <Skeleton width="70%" height="1.25rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="4rem" height="1.5rem" borderRadius="20px" className="dark:!bg-dark-primary-3" />
              </div>
              <Skeleton width="100%" height="3rem" className="dark:!bg-dark-primary-3" />
              <div className="flex gap-4">
                <Skeleton width="5rem" height="1rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="5rem" height="1rem" className="dark:!bg-dark-primary-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Skeleton */}
      <div className="mt-6 bg-white dark:bg-dark-primary-4 rounded-[24px] p-6 shadow-sm border border-ui-borderLight dark:border-ui-border/50 space-y-4">
        <Skeleton width="10rem" height="1.5rem" className="dark:!bg-dark-primary-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-ui-borderLight dark:border-ui-border/50">
              <Skeleton width="100%" height="1rem" className="dark:!bg-dark-primary-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
