export interface LocationSuccessResponse {
  ip: string;
  latitude: number;
  longitude: number;
  success: boolean;
}

/**
 * Gets the user's location info.
 */
export async function getAPILocationInfo(): Promise<LocationSuccessResponse | undefined> {
  const response: LocationSuccessResponse | undefined = await fetch(
    "https://json.geoiplookup.io/"
  ).then((res) => {
    return res.json();
  });

  if (response && response.success) {
    return response;
  }
}
