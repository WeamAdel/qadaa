import { SuccessResponse, FailureResponse, PrayerTimesResponse } from "../types/api/prayer-times";

const apiEndPoint = "https://api.pray.zone/v2/times/today.json";

/**
 * Gets prayer times.
 *
 * @param long Longitude
 * @param lat Latitude
 *
 * @link https://prayertimes.date/api/docs/today;
 */
async function getAPIPrayerTimes(long: Number, lat: Number): Promise<PrayerTimesResponse> {
  return await fetch(`${apiEndPoint}?longitude=${long}&latitude=${lat}`)
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

export default getAPIPrayerTimes;
