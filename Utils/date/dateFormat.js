import moment from "moment-timezone";

export const formatDate = (date) =>
  moment(date).format("DD/MM/YYYY");

export const formatDateTime = (date) =>
  moment(date).format("DD/MM/YYYY HH:mm");

export const formatRelative = (date) =>
  moment(date).fromNow();

export const formatMonthYear = (date) =>
  moment(date).format("MMMM YYYY");


export const formatReportDate = (apiDate) => {
  if (!apiDate) return "N/A";
  try {
    const date = new Date(apiDate);
    if (isNaN(date.getTime())) return "N/A";

    const datePart = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const timePart = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart}, ${timePart}`;
  } catch {
    return "N/A";
  }
};
