import React from "react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { Users, Edit2, Trash2, Clock } from "lucide-react";
import moment from "moment-timezone";

export const getCompanyDashboardColumns = (onViewApplicants, onEdit, onDelete) => [
  {
    header: "Job Title",
    field: "title",
    align: "left",
    type: "custom",
    body: (rowData) => (
      <div className="flex flex-col gap-1">
        <MainText title={rowData.title} className="font-bold text-ui-textMain dark:text-dark-white" />
        <div className="flex items-center gap-3 text-xs text-ui-textMuted dark:text-dark-gray">
          <MainText title={<><Clock size={12} /> {rowData.type}</>} className="flex items-center gap-1" />
        </div>
      </div>
    )
  },
  {
    header: "Posted Date",
    field: "postedAt",
    type: "custom",
    body: (rowData) => (
      <MainText 
        title={moment(rowData.postedAt).format("YYYY-MM-DD")} 
        className="text-sm text-ui-textMuted dark:text-dark-gray" 
      />
    )
  },
  {
    header: "Applicants",
    field: "applicants",
    type: "custom",
    body: (rowData) => (
      <div className="flex items-center gap-2 px-3 py-1 bg-light-blue50 dark:bg-dark-primary-3 text-brand-primary dark:text-brand-accent rounded-full w-fit">
        <Users size={14} />
        <MainText title={`${rowData.applicants} candidates`} className="text-xs font-semibold" />
      </div>
    )
  },
  {
    header: "Actions",
    field: "id",
    type: "custom",
    body: (rowData) => (
      <div className="flex items-center gap-3">
        <MainButton 
          onClick={() => onViewApplicants(rowData)}
          className="p-2 text-brand-primary hover:bg-light-blue50 dark:hover:bg-dark-primary-3 rounded-full transition-colors"
          title="View Applicants"
          icon={<Users size={18} />}
        />
        <MainButton 
          onClick={() => onEdit(rowData)}
          className="p-2 text-ui-textMuted hover:bg-light-primary dark:hover:bg-dark-primary-4 rounded-full transition-colors"
          title="Edit Job"
          icon={<Edit2 size={18} />}
        />
        <MainButton 
          onClick={() => onDelete(rowData.id)}
          className="p-2 text-status-error hover:bg-red-50 dark:hover:bg-status-error/10 rounded-full transition-colors"
          title="Delete Job"
          icon={<Trash2 size={18} />}
        />
      </div>
    )
  }
];
