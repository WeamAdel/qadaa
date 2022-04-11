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
  locationFailed: "Failed to get your location",
  years: "years",
  timeRange: "time range",
  prayersCount: "prayers count",
  yearsHeading: "Enter missed years",
  timeRangeHeading: "Select time range",
  prayersCountHeading: "Enter prayers count",
  yearsDesc: "Generate the prayers schedule by selecting the number of prayers you missed.",
  timeRangeDesc: "Generate the prayers schedule by selecting two dates from calendars.",
  prayersCountDesc: "Generate the prayers schedule by selecting the count of each missed prayer.",
  startDate: "Start date",
  endDate: "End date",
  generate: "Generate",
  numberOfYears: "Number of years",

  // By years form
  yearsRequired: "Years count is required",
  minYears: "Years count can not be less than ",
  maxYears: "Years count can not be more than ",

  // By range form
  startDateRequired: "Start date is required",
  endDateRequired: "End date is required",
  rangeError: "Enter date greater than start date",

  //By prayers count form
  minPrayers: "Please enter at least one prayer count",

  // Schedule modal
  waitScheduleGeneration: "Please wait until schedule is generated",
  scheduleGenerated: "Schedule Generated Successfully",
  downloadSchedule: "Download PDF",
  blockedDownload: "In case of blocked download, please check your browser extensions.",

  // Generated schedule PDF
  day: "Day",
  year: "Year",
  prayer: "Prayer",
  number: "Number",
  done: "Done",
  prayers: "Parayers",

  [Prayer.fajr]: Prayer.fajr,
  [Prayer.dhuhr]: Prayer.dhuhr,
  [Prayer.asr]: Prayer.asr,
  [Prayer.maghrib]: Prayer.maghrib,
  [Prayer.isha]: Prayer.isha,
};

export default EN_TRANSLATION;
