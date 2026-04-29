import { get } from "lodash-es";

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSafe = (obj, path, defaultValue = null) => {
  const result = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  return result === undefined ? defaultValue : result;
};

export const getVal = (primary, secondary, path, fallback = "N/A") => {
  return get(primary, path, get(secondary, path, fallback));
};

export const formatDate = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
