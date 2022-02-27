import Prayer from "./Prayer";

export type DateRange = { startDate: string; endDate: string };

export type PrayersCount = {
  [key in Prayer]: number;
};
