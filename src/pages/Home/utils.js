import dayjs from "dayjs";

export const getTotalDays = (from, to) => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);
  return toDate.diff(fromDate, "day") + 1;
};
