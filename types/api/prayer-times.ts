export interface SuccessResponse {
  success: boolean;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  timestamp: number;
  timezone: string;
}

export interface FailureResponse {
  success: boolean;
  message: string;
}

export type PrayerTimesResponse = SuccessResponse | FailureResponse;
