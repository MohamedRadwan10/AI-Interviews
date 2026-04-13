import React from "react";
import { Paginator } from "primereact/paginator";

const Pagination = ({ page, limit = 9, totalRecords, onPageChange }) => {
  const first = (page - 1) * limit;

  if (!totalRecords || totalRecords <= limit) {
    return null;
  }

  const handlePageChange = (event) => {
    if (onPageChange) {
      onPageChange(event.page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-3">
      <Paginator
        first={first}
        rows={limit}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        className="bg-transparent dark:bg-transparent border-none [&_.p-paginator-page]:rounded-full [&_.p-paginator-page]:w-8 [&_.p-paginator-page]:h-8 [&_.p-paginator-page.p-highlight]:bg-blue-600 [&_.p-paginator-page.p-highlight]:text-white dark:[&_.p-paginator-page]:text-gray-300 dark:[&_.p-paginator-page:not(.p-highlight):hover]:bg-gray-800"
      />
    </div>
  );
};

export default Pagination;
