import Prayer from "./Prayer";

export interface ScheduleRow {
  count: number;
  prayer: Prayer;
}

export type DateRange = { startDate: string; endDate: string };

export type PrayersCount = {
  [key in Prayer]: number;
};
