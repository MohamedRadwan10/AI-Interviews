import React from "react";
import { JobCardLoading } from "./JobCard";

export const JobsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i}>
          <JobCardLoading />
        </div>
      ))}
    </div>
  );
};
