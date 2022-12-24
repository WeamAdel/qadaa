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

const apiEndPoint = 'https://api.aladhan.com/v1/calendar';

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
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error('Failed to get prayer times with status ' + res.status);
			}
		})
		.then((res) => {
			return extractResData(res.data);
		})
		.catch((e) => {
			console.log(e);
			return { success: false, message: e.message };
		});
}

/**
 * Extracts necessary data form the API response.
 *
 * @param data API data
 */
function extractResData(
	data: [
		{
			timings: { [index: string]: string };
			date: { timestamp: number };
			meta: { timezone: string };
		}
	]
): SuccessResponse {
	const dayOfMonth = new Date().getDate() - 1;
	const {
		timings: { Fajr, Dhuhr, Asr, Maghrib, Isha },
		date: { timestamp },
		meta: { timezone },
	} = data[dayOfMonth];

	return {
		success: true,
		prayerTimes: {
			fajr: removePrayerTimezone(Fajr),
			dhuhr: removePrayerTimezone(Dhuhr),
			asr: removePrayerTimezone(Asr),
			maghrib: removePrayerTimezone(Maghrib),
			isha: removePrayerTimezone(Isha),
		},
		timestamp: timestamp,
		timezone,
	};
}

/**
 * Removes the extra timezone string from the prayer time.
 *
 * @example "05:15 (EET)" => "05:15"
 * @param time Time of the prayer
 */
function removePrayerTimezone(time: string): string {
	const result = time.match(/([0-9]+:[0-9]+)/);
	return result ? result[0] : '';
}
