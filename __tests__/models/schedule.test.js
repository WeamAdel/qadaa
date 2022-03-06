import {
  YearsCountSchedule,
  TimeRangeSchedule,
  PrayersCountSchedule,
  ScheduleDayData,
} from "../../models/Schedule";
import Prayer from "../../types/Prayer";

describe("Schedule generated data", () => {
  it("Should return each year's title, prayers and count", () => {
    const schedule = new YearsCountSchedule(2);
    const data = schedule.generateData();
    const year1 = data[0];
    const year2 = data[1];

    expect(data.length).toBe(2);
    expect(year1.title).toBeTruthy();
    expect(year1.prayers.length).toBe(365);

    // Count
    expect(year1.count).toBe(1);
    expect(year2.count).toBe(2);

    //Days
    addDayAssertions(year1.prayers[0], 1, getYearDayStartCount(1, 1));
    addDayAssertions(year2.prayers[0], 1, getYearDayStartCount(2, 1));
    addDayAssertions(year2.prayers[3], 4, getYearDayStartCount(2, 4));
  });

  it("Should return days data for the start end end date reanges", () => {
    const schedule = new TimeRangeSchedule({
      startDate: "2022-01-10",
      endDate: "2022-01-20",
    });
    const data = schedule.generateData();

    expect(data.length).toBe(11);

    addDayAssertions(data[0], 1, 1);
    addDayAssertions(data[10], 11, 5 * 10 + 1);
  });

  it.only("Should return prayers data for added prayers", () => {
    const schedule = new PrayersCountSchedule({
      fajr: 1,
      dhuhr: 2,
      asr: 3,
      maghrib: 4,
      isha: 5,
    });
    const data = schedule.generateData();

    expect(data.length).toBe(15);

    // Count
    expect(data[0].count).toBe(1);
    expect(data[14].count).toBe(15);

    // Prayer
    expect(data[0].prayer).toMatch(Prayer.fajr);
    expect(data[1].prayer).toMatch(Prayer.dhuhr);
    expect(data[3].prayer).toMatch(Prayer.asr);
    expect(data[6].prayer).toMatch(Prayer.maghrib);
    expect(data[10].prayer).toMatch(Prayer.isha);
  });
});

/**
 * Add day test assertions.
 * @param {ScheduleDayData} day Day data
 * @param {number} dayCount Day count in the year
 * @param {number} prayerCountStart The count of the 1st prayer
 */
function addDayAssertions(day, dayCount, prayerCountStart) {
  expect(day.count).toBe(dayCount);
  expect(day.title).toBeTruthy();
  expect(day.prayers.length).toBe(5);

  // Day prayers assertions

  expect(day.prayers[0].prayer).toMatch(Prayer.fajr);
  expect(day.prayers[1].prayer).toMatch(Prayer.dhuhr);
  expect(day.prayers[2].prayer).toMatch(Prayer.asr);
  expect(day.prayers[3].prayer).toMatch(Prayer.maghrib);
  expect(day.prayers[4].prayer).toMatch(Prayer.isha);

  expect(day.prayers[0].count).toBe(prayerCountStart);
  expect(day.prayers[1].count).toBe(prayerCountStart + 1);
  expect(day.prayers[2].count).toBe(prayerCountStart + 2);
  expect(day.prayers[3].count).toBe(prayerCountStart + 3);
  expect(day.prayers[4].count).toBe(prayerCountStart + 4);
}

/**
 * Get a day's 1st prayer count start by year.
 * @param {number} yearCount
 * @param {number} dayCount
 */
function getYearDayStartCount(yearCount, dayCount) {
  return (yearCount - 1) * 365 * 5 + (dayCount - 1) * 5 + 1;
}
