"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { get, map } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";

const MainTable = ({ data, columns, emptyMessage = "No records found" }) => {
  const renderCell = (rowData, col) => {
    const value = get(rowData, col.field);
    const type = get(col, "type", "text");

    if (type === "button") {
      return (
        <MainButton
          onClick={() => col.onClick && col.onClick(rowData)}
          className="p-button-text p-button-sm text-brand-primary hover:bg-brand-primary/10 transition-colors font-bold"
        >
          {col.buttonLabel || "View"}
        </MainButton>
      );
    }

    if (type === "badge") {
      const isPositive = String(value).toLowerCase() === "accepted";
      const isNegative = String(value).toLowerCase() === "rejected";
      const isPending = String(value).toLowerCase() === "pending";
      
      let badgeClass = "text-brand-primary";
      if (isPositive) badgeClass = "text-status-success";
      if (isNegative) badgeClass = "text-status-error";
      if (isPending) badgeClass = "text-ui-textMuted dark:text-ui-muted";

      return (
        <MainText className={`text-sm font-semibold capitalize ${badgeClass}`}>
          {value || "Unknown"}
        </MainText>
      );
    }
    
    if (type === "custom") {
      return col.body ? col.body(rowData) : value;
    }

    return (
      <MainText className="text-sm font-medium text-ui-textMain dark:text-white">
        {value || "-"}
      </MainText>
    );
  };

  return (
    <div className="rounded-3xl border border-ui-borderLight dark:border-ui-border overflow-hidden bg-white dark:bg-dark-primary-4">
      <DataTable
        value={data}
        emptyMessage={emptyMessage}
        className="w-full"
        pt={{
          root: { className: "w-full overflow-hidden rounded-3xl" },
          table: { className: "w-full border-collapse" },
          thead: { className: "border-b border-ui-borderLight dark:border-ui-border" },
          headerRow: { className: "text-center" },
          tbody: { className: "!bg-white dark:!bg-dark-primary-4" },
          bodyRow: { className: "!bg-transparent hover:!bg-slate-50 dark:hover:!bg-dark-primary-3/50 transition-colors border-b border-ui-borderLight dark:border-ui-border/50" },
          emptyMessage: { className: "p-6 text-center text-ui-textMuted dark:text-ui-muted" }
        }}
      >
        {map(columns, (col, index) => {
          const align = col.align || "center";
          const alignClass = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
          const textAlign = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

          return (
            <Column
              key={index}
              field={col.field}
              header={
                <div className={`flex ${alignClass} items-center w-full py-4 px-6`}>
                  <MainText className={`text-xs font-bold text-ui-textMuted dark:text-ui-muted uppercase tracking-wider ${textAlign}`}>
                    {col.header}
                  </MainText>
                </div>
              }
              body={(rowData) => (
                <div className={`py-4 px-6 flex ${alignClass} items-center w-full`}>
                  {renderCell(rowData, col)}
                </div>
              )}
              style={col.style}
              pt={{
                headerCell: { className: `!bg-light-blue50 dark:!bg-dark-primary-3 p-0 border-none ${textAlign}` },
                headerContent: { className: alignClass },
                bodyCell: { className: `p-0 border-none !bg-transparent ${textAlign}` }
              }}
            />
          );
        })}
      </DataTable>
    </div>
  );
};

export default MainTable;
