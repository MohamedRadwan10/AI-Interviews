"use client";
import React from "react";
import { filter } from "lodash-es";
import MainInput from "@/Components/Common/Inputs";
import { jobFilterConfig } from "@/Config/FieldsConfig";
import MainButton from "@/Components/Common/MainButton";

const JobFilter = ({ filters, updateFilter, resetFilters }) => {
  const hasActiveFilters = filter(Object.values(filters), Boolean).length > 0;

  return (
    <div className="w-full bg-white dark:bg-dark-primary-3 border border-ui-borderLight dark:border-ui-border rounded-2xl p-6 shadow-md transition-all duration-300 mt-4 animate-in fade-in slide-in-from-top-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left items-end">
        {jobFilterConfig.fields.map((field) => {
          const rawOptions = typeof field.options === "function" ? field.options(filters) : field.options;
          const options = [
            { label: field.placeholder || "All", value: "" },
            ...(rawOptions || [])
          ];
          
          const isDisabled = typeof field.disabled === "function" ? field.disabled(filters) : !!field.disabled;

          return (
            <MainInput
              key={field.field_name}
              type={field.type}
              field_name={field.field_name}
              label={field.label}
              value={filters[field.field_name] || ""}
              onChange={(e) => updateFilter(field.field_name, e.target.value)}
              options={options}
              placeholder={field.placeholder}
              disabled={isDisabled}
              containerClassName={field.containerClassName || "!mb-0"}
            />
          );
        })}
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end mt-6 border-t border-ui-borderLight dark:border-ui-border pt-4">
          <MainButton
            onClick={resetFilters}
            className="text-xs font-medium text-brand-primary hover:text-brand-primaryDark transition-colors px-3 py-1.5 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20"
          >
            Clear All Filters
          </MainButton>
        </div>
      )}
    </div>
  );
};

export default JobFilter;
