import dayjs from "dayjs";

export const OVER_DAY = 43;

// Total days in a current Month
export const totalDaysOfMonth = dayjs().daysInMonth();
export const firstDayOfWeek = dayjs().day();
const _year = dayjs().year();
const _month = dayjs().month() + 1;
export const first = `${_year}-${_month}-01`;
export const firstDayOfMonth = dayjs(`${_year}-${_month}-01`).day();

/**
 *
 * @param firstDayOfMonth
 * @param totalDaysOfMonth
 * @returns  exactly oder array of days of current Month
 */
export const getDaysArrayOfMonth = (
  firstDayOfMonth: number = 1,
  totalDaysOfMonth: number = 42
): number[] => {
  return new Array(42)
    .fill(OVER_DAY)
    .map((_, index) =>
      index < firstDayOfMonth
        ? _
        : index > totalDaysOfMonth + firstDayOfMonth - 1
        ? _
        : index - firstDayOfMonth + 1
    );
};
