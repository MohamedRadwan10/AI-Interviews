"use client";
import React, { useMemo } from "react";
import { Chart as PrimeChart } from "primereact/chart";
import { getChartConfig } from "./config";
import MainText from "@/Components/Common/MainText";
import { BarChart2 } from "lucide-react";
import { useDarkMode } from "@/Context/DarkModeContext";

const ProgressChart = ({ data, title = "Progress Level Chart" }) => {
  const { isDarkMode } = useDarkMode();

  const config = useMemo(() => {
    return getChartConfig(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  if (!data || !data.datasets) return null;

  return (
    <div className="bg-white dark:bg-dark-primary-4 rounded-3xl p-6 border border-ui-borderLight dark:border-ui-border shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <BarChart2 className="w-5 h-5 text-brand-primary" />
        <MainText tag="h3" className="text-lg font-bold text-ui-textMain dark:text-white">
          {title}
        </MainText>
      </div>
      <div className="h-[300px] w-full">
        <PrimeChart 
          type="line" 
          data={data} 
          options={config.options} 
          className="h-full w-full" 
        />
      </div>
    </div>
  );
};

export default ProgressChart;
