import getAPIPrayerTimesMocked from "../../api/prayer-times";
import PrayerTimes from "../../components/Layout/PrayerTimes/PrayerTimes";
import { render, fireEvent, waitFor } from "@testing-library/react";
import * as useRouter from "next/router";
import { mockGeolocationSuccess } from "../../__mocks__/geolocation-mock";

jest.mock("../../api/prayer-times");
jest.spyOn(useRouter, "useRouter").mockImplementationOnce(() => ({
  locale: "en",
}));
global.navigator.geolocation = mockGeolocationSuccess();

describe("Prayer times API", () => {
  //   it("Should fetch prayer times and show them", async () => {
  //     const { getByTestId, debug } = render(<PrayerTimes />);
  //     expect(getAPIPrayerTimesMocked).toBeCalledTimes(1);
  //   });

  it("Should toggle the prayer times modal", async () => {
    const res = getFakePrayersResponse();
    getAPIPrayerTimesMocked.mockResolvedValueOnce({ res });

    const { getByTestId } = render(<PrayerTimes />);

    fireEvent.click(getByTestId("prayer-times-open-btn"));

    await waitFor(() => {
      expect(getByTestId("prayer-times")).toHaveAttribute("data-open", "true");
    });

    fireEvent.click(getByTestId("prayer-times-close-btn"));

    await waitFor(() => {
      expect(getByTestId("prayer-times")).toHaveAttribute("data-open", "false");
    });
  });
});

function getFakePrayersResponse() {
  const timestamp = new Date("10/10/2022").getTime();
  const res = {
    success: true,
    prayerTimes: {
      fajr: "00:00",
      dhuhr: "00:00",
      asr: "00:00",
      maghrib: "00:00",
      isha: "00:00",
    },
    timestamp,
    timezone: "Africa/Cairo",
  };

  return res;
}
