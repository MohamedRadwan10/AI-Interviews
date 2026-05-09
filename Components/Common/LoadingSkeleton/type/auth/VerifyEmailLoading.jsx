import React from "react";
import { Skeleton } from "primereact/skeleton";

export const VerifyEmailLoading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark-primary-1 bg-light-primary py-12 px-4">
      <div className="w-full max-w-lg px-8 py-10 rounded-lg shadow-md dark:bg-dark-primary-3 bg-light-white flex flex-col items-center text-center">
        <Skeleton shape="circle" size="5rem" className="mb-6 dark:!bg-dark-primary-2" />
        <Skeleton width="70%" height="2rem" className="mb-4 dark:!bg-dark-primary-2" />
        <Skeleton width="90%" height="1.25rem" className="mb-8 dark:!bg-dark-primary-2" />
        <Skeleton width="100%" height="3.5rem" borderRadius="30px" className="dark:!bg-dark-primary-2" />
      </div>
    </div>
  );
};
