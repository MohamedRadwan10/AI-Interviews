import React from "react";
import { Skeleton } from "primereact/skeleton";

export const FieldLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 p-2">
      <Skeleton width="30%" height="1rem" className="mb-1" />
      <Skeleton width="100%" height="3rem" borderRadius="8px" />
    </div>
  );
};
