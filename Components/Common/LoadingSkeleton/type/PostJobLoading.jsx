import React from "react";

export const PostJobLoading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-dark-primary-3 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-100 dark:bg-dark-primary-2 rounded w-1/3 mb-8"></div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 bg-white dark:bg-dark-primary-2 rounded-2xl shadow-sm border border-ui-borderLight dark:border-dark-gray">
            <div className="h-6 bg-gray-200 dark:bg-dark-primary-3 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-100 dark:bg-dark-primary-3 rounded"></div>
              <div className="h-10 bg-gray-100 dark:bg-dark-primary-3 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
