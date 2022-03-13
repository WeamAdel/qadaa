import Prayer from "../types/Prayer";

const EN_TRANSLATION = {
  donate: "donate",
  donatePageTitle: "Qadaa' | Donate",
  generateSchedule: "generate schedule",
  home: "home",
  homeDescription:
    "Little steps make the largest difference, the difference that will change your real life",
  homePageTitle: "Qadaa' | Home",
  secondLang: "العربية",
  schedulePageTitle: "Qadaa' | Generate Schedule",
  siteName: "qadaa'",
  changeToDarkTheme: "change to dark theme",
  changeToLightTheme: "change to light theme",
  prayerTimes: "Prayer Times",
  gregorianDateDesc: "Gregorian Date",
  hijriDateDesc: "Hijri Date",
  retry: "retry",
  prayerTimeAPIFailed: "Failed to get the prayer times at the moment",
  permissionDenied: "Permission denied, please allow this site to access your location",
  possitionUnavailable: "Failed to get your location",
  timeout:
    "Your permission was timedout please try allowing this site to access your location again",
  years: "years",
  timeRange: "time range",
  prayersCount: "prayers count",
  yearsHeading: "Enter missed years",
  timeRangeHeading: "Select time range",
  prayersCountHeading: "Enter prayers count",
  yearsDesc: "Generate the prayers schedule by selecting the number of prayers you missed.",
  timeRangeDesc: "Generate the prayers schedule by selecting two dates from calendars.",
  prayersCountDesc: "Generate the prayers schedule by selecting the count of each missed prayer.",
  startDate: "start date",
  endDate: "end date",
  generate: "generate",
  numberOfYears: "number of years",

  yearsRequired: "years count is required",
  minYears: "years count can not be less than ",
  maxYears: "years count can not be more than ",

  startDateRequired: "start date is required",
  endDateRequired: "end date is required",
  rangeError: "enter date greater than start date",

  waitScheduleGeneration: "Please wait until schedule is generated",
  scheduleGenerated: "Schedule Generated Successfully",
  downloadSchedule: "Download PDF",

  [Prayer.fajr]: Prayer.fajr,
  [Prayer.dhuhr]: Prayer.dhuhr,
  [Prayer.asr]: Prayer.asr,
  [Prayer.maghrib]: Prayer.maghrib,
  [Prayer.isha]: Prayer.isha,
};

export default EN_TRANSLATION;
