import { getLangTrans } from "../lang/lang";
import Language from "../types/Language";
import Prayer from "../types/Prayer";
import { DateRange, PrayersCount } from "../types/Schedule";

interface Schedule {
  lang: Language;
}

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
  prayers: Array<SchedulePrayerData>;
}

export interface SchedulePrayerData {
  prayer: string;
  count: number;
}

export interface TimeRangeSchedule {
  startDate: string;
  endDate: string;
}

export interface PrayersCountSchedule {
  prayersCount: PrayersCount;
}

class Schedule {
  lang;

  /**
   * @param lang Language of the schedule. By default it's in English.
   */
  constructor(lang?: Language) {
    console.log(lang);
    this.lang = lang && lang in Language ? lang : Language.en;
  }
}

export class YearsCountSchedule extends Schedule implements YearsCountSchedule {
  years;

  constructor(years: number, lang?: Language) {
    super(lang);
    this.years = years;
  }

  /**
   * Generates the prayers data list.
   */
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

export class TimeRangeSchedule extends Schedule implements TimeRangeSchedule {
  startDate;
  endDate;

  constructor(dateRange: DateRange, lang?: Language) {
    super(lang);
    this.startDate = dateRange.startDate;
    this.endDate = dateRange.endDate;
  }

  /**
   * Generates the prayers data list.
   */
  generateData(): Array<ScheduleDayData> {
    const days = this.getDaysCount();
    let count = 0;
    const data = [];

    for (let j = 1; j <= days; j++) {
      data.push(createDayPrayers(count, j));
      count += 5;
    }

    return data;
  }

  /**
   * Gets the days count between the start and end dates.
   */
  getDaysCount(): number {
    const startTimeStamp = new Date(this.startDate).getTime();
    const endTimeStamp = new Date(this.endDate).getTime();

    return Math.floor((endTimeStamp - startTimeStamp) / (1000 * 60 * 60 * 24)) + 1;
  }
}

export class PrayersCountSchedule extends Schedule implements PrayersCountSchedule {
  prayersCount;

  constructor(prayersCount: PrayersCount, lang?: Language) {
    super(lang);
    this.prayersCount = prayersCount;
  }

  /**
   * Generates the prayers data list.
   */
  generateData(): Array<SchedulePrayerData> | null {
    let count = 0;
    const data: Array<SchedulePrayerData> = [];
    const lang = getLangTrans(this.lang);
    console.log(lang);
    console.log(this.lang);

    for (let key in this.prayersCount) {
      for (let i = 0; i < this.prayersCount[key as Prayer]; i++) {
        console.log(lang[key]);
        data.push({ prayer: lang[key] || key, count: ++count });
      }
    }

    return data.length ? data : null;
  }
}

/**
 * Creates each day prayer's.
 *
 * @param startCount The start count of the prayer,
 * it represents the number in the generated list of prayers.
 * @param dayNumber Represents the day number in the generated list.
 */
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
