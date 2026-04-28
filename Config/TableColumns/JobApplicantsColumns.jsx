import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import Image from "next/image";
import { User, Eye } from "lucide-react";
import { IMAGE_BASE_URL } from "@/Config/apiRegistry";

export const getJobApplicantsColumns = (onViewApplicant) => [
  {
    header: "Candidate",
    field: "fullName",
    align: "left",
    type: "custom",
    body: (rowData) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-light-main dark:bg-dark-primary-4 flex items-center justify-center overflow-hidden shrink-0">
          {rowData.photo ? (
            <Image 
              src={rowData.photo.startsWith('http') ? rowData.photo : `${IMAGE_BASE_URL}${rowData.photo}`} 
              alt={rowData.fullName} 
              width={40} 
              height={40} 
              className="object-cover w-full h-full"
            />
          ) : (
            <User size={20} className="text-ui-muted" />
          )}
        </div>
        <div className="flex flex-col">
          <MainText title={rowData.fullName} className="font-bold text-ui-textMain dark:text-dark-white" />
          {rowData.jobTitle && (
            <MainText title={rowData.jobTitle} className="text-xs text-ui-textMuted" />
          )}
        </div>
      </div>
    )
  },
  {
    header: "Overall Score",
    field: "overallScore",
    align: "center",
    type: "custom",
    body: (rowData) => (
      <MainText 
        title={rowData.overallScore ? `${rowData.overallScore.toFixed(1)} / 10` : "N/A"} 
        className={`font-bold ${rowData.overallScore >= 7 ? 'text-status-success' : rowData.overallScore >= 5 ? 'text-status-warning' : 'text-status-error'}`} 
      />
    )
  },
  {
    header: "Status",
    field: "status",
    align: "center",
    type: "badge",
    body: (rowData) => {
      const statuses = { 0: "accepted", 1: "rejected", 2: "pending" };
      return statuses[rowData.status] || "pending";
    }
  },
  {
    header: "Actions",
    field: "userId",
    align: "center",
    type: "custom",
    body: (rowData) => (
      <MainButton 
        title="View Report"
        icon={<Eye size={16} />}
        className="bg-brand-primary hover:bg-brand-primaryDark text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all"
        onClick={() => onViewApplicant(rowData)}
      />
    )
  }
];
