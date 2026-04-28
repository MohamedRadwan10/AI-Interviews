"use client";

import React from "react";
import { get } from "lodash-es";
import MainText from "@/Components/Common/MainText";

const StatCard = (props) => {
  const title = get(props, "title", "");
  const value = get(props, "value", 0);
  const Icon = get(props, "icon");
  const className = get(props, "className", "");

  return (
    <div className={`bg-light-white dark:bg-dark-primary-3 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border flex justify-between items-center transition-all hover:shadow-lg ${className}`}>
      <div className="flex flex-col gap-2">
        <MainText 
          title={title} 
          className="text-ui-textMuted dark:text-dark-gray font-medium text-lg" 
        />
        <MainText 
          title={value} 
          className="text-4xl font-bold text-ui-textMain dark:text-dark-white" 
        />
      </div>
      {Icon && (
        <div className="p-4 bg-light-blue50 dark:bg-dark-primary-4 rounded-full text-brand-primary">
          <Icon size={32} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
