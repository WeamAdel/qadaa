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

const apiEndPoint = "https://api.pray.zone/v2/times/today.json";

/**
 * Gets prayer times.
 * @param longitude Longitude
 * @param latitude Latitude
 * @link https://prayertimes.date/api/docs/today;
 */
export async function getAPIPrayerTimes(
  longitude: Number,
  latitude: Number
): Promise<PrayerTimesResponse> {
  return await fetch(`${apiEndPoint}?longitude=${longitude}&latitude=${latitude}`)
    .then((res: any = {}) => {
      console.log(res);

      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Failed to get prayer times with status " + res.status);
      }
    })
    .then((res) => {
      return extractResData(res);
    })
    .catch((e) => {
      console.log(e);
      return { success: false, message: e.message };
    });
}

/**
 * Extracts necessary data form the API response.
 *
 * @param res API success response.
 */
function extractResData(res: any = {}): SuccessResponse {
  const {
    results: { datetime, location },
  } = res;
  const { Fajr, Dhuhr, Asr, Maghrib, Isha } = datetime[0].times;
  const { timestamp } = datetime[0].date;
  const { timezone } = location;

  return {
    success: true,
    prayerTimes: {
      fajr: Fajr,
      dhuhr: Dhuhr,
      asr: Asr,
      maghrib: Maghrib,
      isha: Isha,
    },
    timestamp,
    timezone,
  };
}
