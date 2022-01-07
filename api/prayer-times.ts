interface SuccessResponse {
  success: boolean;
  prayerTimes: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  date: {
    hijri: string;
    timestamp: number;
  };
  timezone: string;
}

interface FailureResponse {
  success: boolean;
  message: string;
}

type PrayerTimesResponse = SuccessResponse | FailureResponse;

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
  const { hijri, timestamp } = datetime[0].date;
  const { timezone } = location;

  return {
    success: true,
    prayerTimes: {
      Fajr,
      Dhuhr,
      Asr,
      Maghrib,
      Isha,
    },
    date: {
      hijri,
      timestamp,
    },
    timezone,
  };
}

export default getAPIPrayerTimes;
