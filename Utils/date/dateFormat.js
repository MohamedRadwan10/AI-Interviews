import moment from "moment-timezone";

export const formatDate = (date) =>
  moment(date).format("DD/MM/YYYY");

export const formatDateTime = (date) =>
  moment(date).format("DD/MM/YYYY HH:mm");

export const formatRelative = (date) =>
  moment(date).fromNow();

export const formatMonthYear = (date) =>
  moment(date).format("MMMM YYYY");
