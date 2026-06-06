import { get } from "lodash-es";
import { APP_CONFIG } from "@/Config/appConfig";

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

export const getScoreColor = (score) => {
  const statusColors = get(APP_CONFIG, "ui.statusColors", {});
  if (score > 70) return statusColors.success;
  if (score > 40) return statusColors.warning;
  return statusColors.error;
};

export const getScoreColors = (score) => {
  const statusColors = get(APP_CONFIG, "ui.statusColors", {});
  if (score >= 45) {
    return statusColors.success;
  }
  if (score >= 30) {
    return statusColors.warning;
  }
  return statusColors.error;
};

export const getMatchColor = (label) => {
  const l = String(label).toLowerCase();
  if (l.includes("excellent") || l.includes("good") || l.includes("perfect") || l.includes("strong")) return "text-status-success";
  if (l.includes("average") || l.includes("fair") || l.includes("partial") || l.includes("weak")) return "text-status-warning";
  return "text-status-error";
};
