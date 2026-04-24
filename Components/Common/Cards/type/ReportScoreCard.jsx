"use client";
import React from "react";
import { get } from "lodash-es";
import MainText from "../../MainText";

const ReportScoreCard = (props) => {
  const data = props.data || props;
  const label = get(data, "label", "");
  const value = get(data, "value", "0");
  const Icon = get(data, "icon");
  const color = get(data, "color", "text-brand-primary");
  const bg = get(data, "bg", "bg-brand-primary/10");

  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
      <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-3`}>
        {Icon && <Icon className={`w-5 h-5 ${color}`} />}
      </div>
      <MainText tag="span" className={`text-2xl font-bold ${color} mb-1`}>
        {value}
      </MainText>
      <MainText tag="span" className="text-xs font-medium text-ui-textMuted dark:text-ui-muted text-center">
        {label}
      </MainText>
    </div>
  );
};

export default ReportScoreCard;
