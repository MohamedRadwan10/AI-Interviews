import React from "react";
import Loading from "@/Components/Common/LoadingSkeleton";

const RouteLoading = ({ type }) => {
  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto w-full">
         <Loading type={type} />
      </div>
    </div>
  );
};

export default RouteLoading;
