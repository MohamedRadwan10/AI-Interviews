import { padStart } from "lodash-es";

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${padStart(secs.toString(), 2, "0")}`;
};
