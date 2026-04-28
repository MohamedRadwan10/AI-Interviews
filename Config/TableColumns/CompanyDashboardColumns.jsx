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
    body: (rowData) => {
      const { title, type } = rowData;
      const icon = <Clock size={12} />;
      const typeText = <>{icon} {type}</>;
      return (
        <div className="flex flex-col gap-1">
          <MainText title={title} className="font-bold text-ui-textMain dark:text-dark-white" />
          <div className="flex items-center gap-3 text-xs text-ui-textMuted dark:text-dark-gray">
            <MainText title={typeText} className="flex items-center gap-1" />
          </div>
        </div>
      );
    }
  },
  {
    header: "Posted Date",
    field: "postedAt",
    align: "center",
    type: "custom",
    body: (rowData) => {
      const date = moment(rowData.postedAt).format("YYYY-MM-DD");
      return <MainText title={date} className="text-sm text-ui-textMuted dark:text-dark-gray" />;
    }
  },
  {
    header: "Applicants",
    field: "applicants",
    align: "center",
    type: "custom",
    body: (rowData) => {
      const count = rowData.applicants;
      const text = `${count} candidates`;
      const icon = <Users size={14} />;
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-light-blue50 dark:bg-dark-primary-3 text-brand-primary dark:text-brand-accent rounded-full w-fit">
          {icon}
          <MainText title={text} className="text-xs font-semibold" />
        </div>
      );
    }
  },
  {
    header: "Actions",
    field: "id",
    align: "center",
    type: "custom",
    body: (rowData) => {
      const onApplicants = () => onViewApplicants(rowData);
      const onEditJob = () => onEdit(rowData);
      const onDeleteJob = () => onDelete(rowData.id);
      
      const icons = { view: <Users size={18} />, edit: <Edit2 size={18} />, delete: <Trash2 size={18} /> };
      
      return (
        <div className="flex items-center gap-3">
          <MainButton onClick={onApplicants} className="p-2 text-brand-primary hover:bg-light-blue50 dark:hover:bg-dark-primary-3 rounded-full transition-colors" title="View Applicants" icon={icons.view} />
          <MainButton onClick={onEditJob} className="p-2 text-ui-textMuted hover:bg-light-primary dark:hover:bg-dark-primary-4 rounded-full transition-colors" title="Edit Job" icon={icons.edit} />
          <MainButton onClick={onDeleteJob} className="p-2 text-status-error hover:bg-red-50 dark:hover:bg-status-error/10 rounded-full transition-colors" title="Delete Job" icon={icons.delete} />
        </div>
      );
    }
  }
];
