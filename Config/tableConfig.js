import React from "react";
import { formatDate } from "@/Utils/date/dateFormat";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import Image from "next/image";
import { Users, Edit2, Trash2, Clock, User, Eye } from "lucide-react";
import moment from "moment-timezone";
import { IMAGE_BASE_URL } from "@/Config/apiRegistry";

export const CANDIDATE_DASHBOARD_COLUMNS = (navigateTo, userId) => [
  { field: "roleApplied", header: "Role Applied", sortable: true },
  { field: "company", header: "Company", sortable: true },
  { 
    field: "date", 
    header: "Date", 
    sortable: true,
    body: (r) => r.date ? formatDate(r.date) : "-", 
    type: "custom" 
  },
  { 
    field: "overallScore", 
    header: "Overall Score", 
    sortable: true,
    body: (r) => `${r.overallScore}`, 
    type: "custom" 
  },
  { 
    field: "hasReport", 
    header: "Status", 
    type: "custom", 
    body: (r) => {
      const statusText = r.hasReport ? "Completed" : "Pending";
      const statusClass = `px-2 py-1 rounded-full text-xs font-bold ${r.hasReport ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'}`;
      return (
        <span className={statusClass}>
          {statusText}
        </span>
      );
    }
  },
  { 
    field: "action", 
    header: "Report", 
    type: "button", 
    onClick: (row) => navigateTo(`/intelliHire/report/${row.sessionId}/${userId}`)
  }
];

export const COMPANY_DASHBOARD_COLUMNS = (onViewApplicants, onEdit, onDelete) => [
  {
    header: "Job Title",
    field: "title",
    align: "left",
    sortable: true,
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
    sortable: true,
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
    sortable: true,
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

export const JOB_APPLICANTS_COLUMNS = (onViewApplicant) => [
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
    sortable: true,
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
