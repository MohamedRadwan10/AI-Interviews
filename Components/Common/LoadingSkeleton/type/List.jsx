import React from "react";
import { Skeleton } from "primereact/skeleton";

export const ListLoading = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4 items-center">
          <Skeleton shape="circle" size="3rem" className="dark:!bg-dark-primary-3" />
          <div className="flex flex-col gap-2 flex-1">
              <Skeleton width="100%" height="1rem" className="dark:!bg-dark-primary-3" />
              <Skeleton width="75%" height="1rem" className="dark:!bg-dark-primary-3" />
          </div>
        </div>
      ))}
    </div>
  );
};
