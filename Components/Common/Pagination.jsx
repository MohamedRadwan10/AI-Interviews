"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, limit = 9, totalRecords, onPageChange, scrollDelay = 30 }) => {
  if (!totalRecords || totalRecords <= limit) {
    return null;
  }

  const totalPages = Math.ceil(totalRecords / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && onPageChange) {
      onPageChange(newPage);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, scrollDelay);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-12 gap-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-ui-borderLight dark:border-dark-gray/30 text-ui-textMuted dark:text-ui-muted hover:bg-light-blue50 dark:hover:bg-dark-primary-3 hover:text-brand-primary dark:hover:text-brand-accent disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ui-textMuted dark:disabled:hover:text-ui-muted transition-all duration-200"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 ${
                isActive
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105"
                  : "text-ui-textMuted dark:text-ui-muted hover:bg-light-blue50 dark:hover:bg-dark-primary-3 hover:text-brand-primary dark:hover:text-brand-accent border border-transparent"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-ui-borderLight dark:border-dark-gray/30 text-ui-textMuted dark:text-ui-muted hover:bg-light-blue50 dark:hover:bg-dark-primary-3 hover:text-brand-primary dark:hover:text-brand-accent disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ui-textMuted dark:disabled:hover:text-ui-muted transition-all duration-200"
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
