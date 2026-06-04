"use client";
import React from "react";
import { Skeleton } from "primereact/skeleton";

const SK = ({ w, h, r = "8px", className = "" }) => (
  <Skeleton width={w} height={h} borderRadius={r} className={`dark:!bg-dark-primary-3 ${className}`} />
);

export const SettingLoading = () => {
  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

        <SK w="8rem" h="2rem" r="10px" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-4">

          <div className="lg:col-span-1 bg-light-white dark:bg-dark-primary-4 rounded-3xl p-4 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                <SK w="1.25rem" h="1.25rem" r="6px" />
                <SK w={`${5 + i}rem`} h="1rem" />
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">

            <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6">

              <div className="flex flex-col gap-4">
                <SK w="10rem" h="1.5rem" r="8px" />
                <SK w="100%" h="1px" r="0" />
              </div>

              <div className="flex items-center gap-5 py-2">
                <Skeleton shape="circle" size="6rem" className="dark:!bg-dark-primary-3 shrink-0" />
                <div className="flex flex-col gap-3 flex-1">
                  <SK w="14rem" h="1.1rem" />
                  <SK w="9rem" h="0.85rem" />
                </div>
                <SK w="7rem" h="2.5rem" r="12px" />
              </div>

              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <SK w="6rem" h="0.85rem" />
                  <SK w="100%" h="2.8rem" r="12px" />
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-2">
                <SK w="5.5rem" h="2.5rem" r="12px" />
                <SK w="7rem" h="2.5rem" r="12px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
