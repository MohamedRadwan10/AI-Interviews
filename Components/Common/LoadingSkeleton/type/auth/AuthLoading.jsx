import React from "react";
import { Skeleton } from "primereact/skeleton";

const AuthLoading = ({ fieldsCount = 2, hideSocial = false }) => {
  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark-primary-1 bg-light-primary py-12 px-4">
      <div className="w-full max-w-2xl px-8 py-8 rounded-lg shadow-md dark:bg-dark-primary-3 bg-light-white">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6 w-full gap-2">
          <Skeleton shape="circle" size="3.5rem" className="dark:!bg-dark-primary-2" />
          <Skeleton width="12rem" height="2.5rem" className="dark:!bg-dark-primary-2" />
        </div>

        {/* Title Section */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Skeleton width="60%" height="2rem" className="dark:!bg-dark-primary-2" />
          <Skeleton width="80%" height="1.25rem" className="dark:!bg-dark-primary-2" />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6 mb-8">
          {Array.from({ length: fieldsCount }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton width="5rem" height="1rem" className="dark:!bg-dark-primary-2" />
              <Skeleton width="100%" height="3.5rem" borderRadius="12px" className="dark:!bg-dark-primary-2" />
            </div>
          ))}
          <Skeleton width="100%" height="3.5rem" borderRadius="30px" className="mt-4 dark:!bg-dark-primary-2" />
        </div>

        {/* Social Section */}
        {!hideSocial && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-ui-borderLight dark:bg-ui-border" />
              <Skeleton width="8rem" height="1rem" className="dark:!bg-dark-primary-2" />
              <div className="flex-1 h-px bg-ui-borderLight dark:bg-ui-border" />
            </div>

            <div className="flex gap-4">
              <Skeleton width="100%" height="3rem" borderRadius="8px" className="dark:!bg-dark-primary-2" />
              <Skeleton width="100%" height="3rem" borderRadius="8px" className="dark:!bg-dark-primary-2" />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <Skeleton width="15rem" height="1.25rem" className="dark:!bg-dark-primary-2" />
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
