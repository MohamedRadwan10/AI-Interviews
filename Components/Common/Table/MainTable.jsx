"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getVal } from "@/Utils/Func/Common";
import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";

const MainTable = ({ data, columns, emptyMessage = "No records found", scrollable = true, scrollHeight = "500px" }) => {
  const renderCell = (rowData, col) => {
    const value = getVal(rowData, null, col.field);
    const type = getVal(col, null, "type", "text");
    const buttonLabel = getVal(col, null, "buttonLabel", "View");

    if (type === "button") {
      const handleBtnClick = () => col.onClick && col.onClick(rowData);
      return (
        <MainButton
          onClick={handleBtnClick}
          className="p-button-text p-button-sm text-brand-primary hover:bg-brand-primary/10 transition-colors font-bold"
        >
          {buttonLabel}
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
      const customBody = col.body ? col.body(rowData) : value;
      return customBody;
    }

    const displayValue = value || "-";
    return (
      <MainText className="text-sm font-medium text-ui-textMain dark:text-white">
        {displayValue}
      </MainText>
    );
  };

  return (
    <div className="rounded-3xl border border-ui-borderLight dark:border-ui-border overflow-hidden bg-white dark:bg-dark-primary-4">
      <DataTable
        value={data}
        emptyMessage={emptyMessage}
        className="w-full"
        scrollable={scrollable}
        scrollHeight={scrollHeight}
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
          const isSortable = !!col.sortable && !!col.field;

          return (
            <Column
              key={index}
              field={col.field}
              sortable={isSortable}
              header={
                <MainText className={`text-xs font-bold text-ui-textMuted dark:text-ui-muted uppercase tracking-wider ${textAlign}`}>
                  {col.header}
                </MainText>
              }
              body={(rowData) => (
                <div className={`py-4 px-6 flex ${alignClass} items-center w-full`}>
                  {renderCell(rowData, col)}
                </div>
              )}
              style={col.style}
              pt={{
                headerCell: { className: `!bg-light-blue50 dark:!bg-dark-primary-3 py-4 px-6 border-none ${textAlign} select-none ${isSortable ? "cursor-pointer" : ""}` },
                headerContent: { className: `flex items-center gap-2 ${alignClass}` },
                sortIcon: { className: "text-ui-textMuted dark:text-ui-muted w-3 h-3 transition-colors" },
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
