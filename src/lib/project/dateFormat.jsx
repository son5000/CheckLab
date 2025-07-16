import { format } from "date-fns";

export function dateformat(date) {
  const hasTimeDate = format(new Date(date), "yyyy-MM-dd HH:mm");
  const hasDayDate = format(new Date(date), "yyyy-MM-dd");

  return { hasTimeDate, hasDayDate };
}
