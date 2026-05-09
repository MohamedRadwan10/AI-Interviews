import { get } from "lodash-es";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getVal = (primary, secondary, path, fallback = "N/A") => {
  return get(primary, path, get(secondary, path, fallback));
};
