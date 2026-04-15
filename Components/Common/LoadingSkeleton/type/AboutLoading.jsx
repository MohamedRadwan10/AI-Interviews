import React from "react";
import { Skeleton } from "primereact/skeleton";

export const AboutLoading = () => {
  return (
    <div className="min-h-screen font-sans space-y-10">
      <section className="text-center py-16 px-6 space-y-4">
        <Skeleton width="60%" height="4rem" className="mx-auto dark:!bg-dark-primary-3" />
        <Skeleton width="40%" height="1.5rem" className="mx-auto dark:!bg-dark-primary-3" />
      </section>

      {[1, 2].map((section) => (
        <section key={section} className="px-32 py-10 w-full space-y-8">
          <div className="space-y-3">
             <Skeleton width="15rem" height="2rem" className="dark:!bg-dark-primary-3" />
             <Skeleton width="25rem" height="1.25rem" className="dark:!bg-dark-primary-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white dark:bg-dark-primary-3/30 border border-ui-borderLight dark:border-ui-border space-y-4">
                <Skeleton shape="circle" size="3rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="60%" height="1.5rem" className="dark:!bg-dark-primary-3" />
                <Skeleton width="100%" height="3rem" className="dark:!bg-dark-primary-3" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
