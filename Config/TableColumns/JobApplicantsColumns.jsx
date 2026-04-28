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
    body: (rowData) => {
      const { photo, fullName, jobTitle } = rowData;
      const photoUrl = photo ? (photo.startsWith('http') ? photo : `${IMAGE_BASE_URL}${photo}`) : null;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-light-main dark:bg-dark-primary-4 flex items-center justify-center overflow-hidden shrink-0">
            {photoUrl ? <Image src={photoUrl} alt={fullName} width={40} height={40} className="object-cover w-full h-full" /> : <User size={20} className="text-ui-muted" />}
          </div>
          <div className="flex flex-col">
            <MainText title={fullName} className="font-bold text-ui-textMain dark:text-dark-white" />
            {jobTitle && <MainText title={jobTitle} className="text-xs text-ui-textMuted" />}
          </div>
        </div>
      );
    }
  },
  {
    header: "Overall Score",
    field: "overallScore",
    align: "center",
    type: "custom",
    body: (rowData) => {
      const score = rowData.overallScore;
      const scoreText = score ? `${score.toFixed(1)} / 10` : "N/A";
      const scoreClass = `font-bold ${score >= 7 ? 'text-status-success' : score >= 5 ? 'text-status-warning' : 'text-status-error'}`;
      return <MainText title={scoreText} className={scoreClass} />;
    }
  },
  {
    header: "Status",
    field: "status",
    align: "center",
    type: "badge",
    body: (rowData) => {
      const statuses = { 0: "accepted", 1: "rejected", 2: "pending" };
      const statusText = statuses[rowData.status] || "pending";
      return statusText;
    }
  },
  {
    header: "Actions",
    field: "userId",
    align: "center",
    type: "custom",
    body: (rowData) => {
      const onClick = () => onViewApplicant(rowData);
      const icon = <Eye size={16} />;
      return <MainButton title="View Report" icon={icon} className="bg-brand-primary hover:bg-brand-primaryDark text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all" onClick={onClick} />;
    }
  }
];
