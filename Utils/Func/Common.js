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
