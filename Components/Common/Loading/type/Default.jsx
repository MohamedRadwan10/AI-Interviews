import React from "react";
import { Skeleton } from "primereact/skeleton";

export const DefaultLoading = () => {
  return (
    <div className="flex justify-center items-center p-8 w-full">
      <Skeleton width="80%" height="4rem" borderRadius="16px" />
    </div>
  );
};
