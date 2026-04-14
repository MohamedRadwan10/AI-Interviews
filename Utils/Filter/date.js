import moment from "moment-timezone";

export const Since = (data) => {
  if (!data) return;
  return moment(data).fromNow();
};