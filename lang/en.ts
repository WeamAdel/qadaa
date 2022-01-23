import Prayer from "../types/Prayer";

const EN_TRANSLATION = {
  about: "about",
  aboutPageTitle: "Qadaa' | About",
  donate: "donate",
  donatePageTitle: "Qadaa' | Donate",
  generateSchedule: "generate schedule",
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
  [Prayer.fajr]: Prayer.fajr,
  [Prayer.dhuhr]: Prayer.dhuhr,
  [Prayer.asr]: Prayer.asr,
  [Prayer.maghrib]: Prayer.maghrib,
  [Prayer.isha]: Prayer.isha,
};

export default EN_TRANSLATION;
