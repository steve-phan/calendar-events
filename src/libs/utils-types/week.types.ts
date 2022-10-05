export enum Days {
  Sunday = "Sun",
  Monday = "Mon",
  Tusday = "Tue",
  Wednesday = "Wed",
  Thursday = "Thu",
  Friday = "Fri",
  Saturday = "Sat",
}

export type TDays = Days[];

export enum DayOfWeekIndex {
  Sunday = "6",
  Monday = "5",
  Tusday = "4",
  Wednesday = "3",
  Thursday = "2",
  Friday = "1",
  Saturday = "0",
}

export type TDayOfWeekIndex = DayOfWeekIndex[];

export const daysOfTheWeek: TDays = [
  Days.Sunday,
  Days.Monday,
  Days.Tusday,
  Days.Wednesday,
  Days.Thursday,
  Days.Friday,
  Days.Saturday,
];

export const daysOfTheWeekOffset: TDayOfWeekIndex = [
  DayOfWeekIndex.Sunday,
  DayOfWeekIndex.Monday,
  DayOfWeekIndex.Tusday,
  DayOfWeekIndex.Wednesday,
  DayOfWeekIndex.Thursday,
  DayOfWeekIndex.Friday,
  DayOfWeekIndex.Saturday,
];
