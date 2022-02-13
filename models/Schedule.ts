import Prayer from "../types/Prayer";
import { ScheduleRow } from "../types/Schedule";

export interface YearsCountSchedule {
  years: number;
}

export interface ScheduleYearData {
  title: string;
  count: number;
  prayers: Array<ScheduleDayData>;
}

export interface ScheduleDayData {
  title: string;
  count: number;
  prayers: Array<ScheduleRow>;
}

export class YearsCountSchedule implements YearsCountSchedule {
  years;

  constructor(years: number) {
    this.years = years;
  }

  generateData(): Array<ScheduleYearData> {
    let count = 0;
    const data = [];

    // Creating Years
    for (let i = 1; i <= this.years; i++) {
      const days = 365;
      const title = "Year " + i;
      const prayers = [];

      // Creating days
      for (let j = 1; j <= days; j++) {
        prayers.push(createDayPrayers(count, j));
        count += 5;
      }

      const yearData: ScheduleYearData = { title, prayers, count: i };

      data.push(yearData);
    }

    return data;
  }
}

function createDayPrayers(startCount: number, dayNumber: number): ScheduleDayData {
  const dayTitle = "Day " + dayNumber;
  const dayPrayers = [];
  let count = startCount;

  dayPrayers.push({ count: ++count, prayer: Prayer.fajr });
  dayPrayers.push({ count: ++count, prayer: Prayer.dhuhr });
  dayPrayers.push({ count: ++count, prayer: Prayer.asr });
  dayPrayers.push({ count: ++count, prayer: Prayer.maghrib });
  dayPrayers.push({ count: ++count, prayer: Prayer.isha });

  return { title: dayTitle, prayers: dayPrayers, count: dayNumber };
}
