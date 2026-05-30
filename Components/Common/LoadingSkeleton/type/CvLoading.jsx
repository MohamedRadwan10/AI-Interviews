"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

export const CvLoading = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

      <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Skeleton width="5rem" height="5rem" borderRadius="16px" className="dark:!bg-dark-primary-3 shrink-0" />
            <div className="flex flex-col gap-3">
              <Skeleton width="14rem" height="1.75rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="9rem" height="1rem" className="dark:!bg-dark-primary-3" />
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <Skeleton width="12rem" height="2rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
                <Skeleton width="9rem" height="2rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
              </div>
            </div>
          </div>
          <Skeleton width="10rem" height="3rem" borderRadius="16px" className="dark:!bg-dark-primary-3 shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 flex flex-col gap-8">

          <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
            <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-ui-border/50 pb-4 mb-6">
              <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="10rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
            <div className="relative border-l-2 border-ui-borderLight dark:border-ui-border/30 ml-3 pl-6 flex flex-col gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="relative flex flex-col gap-3">
                  <Skeleton shape="circle" size="1rem" className="dark:!bg-dark-primary-3 absolute -left-[29px] top-1" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Skeleton width="12rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="9rem" height="1.5rem" borderRadius="12px" className="dark:!bg-dark-primary-3" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton width="7rem" height="0.85rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="5rem" height="1.25rem" borderRadius="6px" className="dark:!bg-dark-primary-3" />
                  </div>
                  <Skeleton width="100%" height="2.5rem" className="dark:!bg-dark-primary-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
            <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-ui-border/50 pb-4 mb-6">
              <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="6rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-4 p-5 rounded-2xl border border-ui-borderLight dark:border-ui-border/30">
                  <Skeleton width="10rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
                  <Skeleton width="100%" height="2rem" className="dark:!bg-dark-primary-3" />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} width="4rem" height="1.25rem" borderRadius="6px" className="dark:!bg-dark-primary-3" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
            <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-ui-border/50 pb-4 mb-6">
              <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="7rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
            <div className="flex flex-col gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Skeleton width="3rem" height="3rem" borderRadius="12px" className="dark:!bg-dark-primary-3 shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <Skeleton width="14rem" height="1rem" className="dark:!bg-dark-primary-3" />
                      <Skeleton width="7rem" height="1.25rem" borderRadius="6px" className="dark:!bg-dark-primary-3" />
                    </div>
                    <Skeleton width="9rem" height="0.85rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="5rem" height="0.85rem" className="dark:!bg-dark-primary-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-8">

          <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
            <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-ui-border/50 pb-4 mb-6">
              <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="9rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton
                  key={i}
                  width={`${4 + Math.floor(i % 3) * 2}rem`}
                  height="2rem"
                  borderRadius="12px"
                  className="dark:!bg-dark-primary-3"
                />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50">
            <div className="flex items-center gap-3 border-b border-ui-borderLight dark:border-ui-border/50 pb-4 mb-6">
              <Skeleton shape="circle" size="1.5rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="8rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
            </div>
            <div className="flex flex-col gap-5">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl border border-ui-borderLight dark:border-ui-border/30">
                  <div className="flex items-start justify-between gap-2">
                    <Skeleton width="10rem" height="1rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="4.5rem" height="1.25rem" borderRadius="4px" className="dark:!bg-dark-primary-3 shrink-0" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton width="8rem" height="0.85rem" className="dark:!bg-dark-primary-3" />
                    <Skeleton width="5rem" height="0.65rem" className="dark:!bg-dark-primary-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
