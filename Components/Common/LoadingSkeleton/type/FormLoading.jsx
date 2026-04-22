import React from "react";
import { Skeleton } from "primereact/skeleton";

const FormLoading = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 space-y-8 bg-white dark:bg-dark-primary-4 rounded-3xl shadow-xl border border-light-blue100/50 dark:border-ui-border">
      <div className="space-y-4">
        <Skeleton width="40%" height="2.5rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="100%" height="1.25rem" className="dark:!bg-dark-primary-3" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton width="30%" height="1rem" className="dark:!bg-dark-primary-3" />
            <Skeleton width="100%" height="3rem" borderRadius="0.75rem" className="dark:!bg-dark-primary-3" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Skeleton width="30%" height="1rem" className="dark:!bg-dark-primary-3" />
        <Skeleton width="100%" height="8rem" borderRadius="0.75rem" className="dark:!bg-dark-primary-3" />
      </div>

      <Skeleton width="100%" height="3.5rem" borderRadius="1.75rem" className="mt-10 dark:!bg-dark-primary-3" />
    </div>
  );
};

export default FormLoading;
