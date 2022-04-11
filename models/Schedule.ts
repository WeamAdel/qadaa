import { getLangTrans } from "../lang/lang";
import Language from "../types/Language";
import Prayer from "../types/Prayer";
import { DateRange, PrayersCount } from "../types/Schedule";

type Translations = { [key: string]: string };

interface Schedule {
  lang: Language;
  translations: Translations;
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
  translations;

  /**
   * @param lang Language of the schedule. By default it's in English.
   */
  constructor(lang?: Language) {
    if (lang && lang in Language) {
      const translations = getLangTrans(lang);

      this.lang = lang;
      this.translations = translations;
    } else {
      this.lang = Language.en;
      this.translations = {};
    }
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
    const yearPrefix = this.translations.year || "Year";

    // Creating Years
    for (let i = 1; i <= this.years; i++) {
      const days = 365;
      const title = `${yearPrefix} ${i}`;
      const prayers = [];

      // Creating days
      for (let j = 1; j <= days; j++) {
        prayers.push(createDayPrayers(count, j, this.translations));
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
      data.push(createDayPrayers(count, j, this.translations));
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

    for (let key in this.prayersCount) {
      for (let i = 0; i < this.prayersCount[key as Prayer]; i++) {
        console.log(this.translations[key]);
        data.push({ prayer: this.translations[key] || key, count: ++count });
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
function createDayPrayers(
  startCount: number,
  dayNumber: number,
  translations: Translations
): ScheduleDayData {
  const dayTitle = `${translations.day || "Day"} ${dayNumber}`;
  const dayPrayers = [];
  let count = startCount;

  dayPrayers.push({ count: ++count, prayer: translations[Prayer.fajr] });
  dayPrayers.push({ count: ++count, prayer: translations[Prayer.dhuhr] });
  dayPrayers.push({ count: ++count, prayer: translations[Prayer.asr] });
  dayPrayers.push({ count: ++count, prayer: translations[Prayer.maghrib] });
  dayPrayers.push({ count: ++count, prayer: translations[Prayer.isha] });

  return { title: dayTitle, prayers: dayPrayers, count: dayNumber };
}
