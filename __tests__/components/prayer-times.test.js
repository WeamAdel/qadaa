import { getAPIPrayerTimes } from "../../api/prayer-times";
import { getAPILocationInfo } from "../../api/location";
import PrayerTimes from "../../components/Layout/PrayerTimes/PrayerTimes";
import { render, fireEvent, waitFor } from "@testing-library/react";
import * as useRouter from "next/router";
import Prayer from "../../types/Prayer";

jest.mock("../../api/prayer-times");
jest.mock("../../api/location");

afterAll(() => {
  jest.clearAllMocks();
});

jest.spyOn(useRouter, "useRouter").mockImplementationOnce(() => ({
  locale: "en",
}));

describe("Prayer times API", () => {
  it("Should fetch prayer times and show them", async () => {
    const prayersRes = getFakePrayersResponse();

    triggerSuccessfullPrayerTimesMock();

    const { getByTestId } = render(<PrayerTimes />);

    await waitFor(() => {
      expect(getAPILocationInfo).toBeCalledTimes(1);
      expect(getAPIPrayerTimes).toBeCalledTimes(1);
      expect(getAPIPrayerTimes).toBeCalledWith(30, 10);

      expect(getByTestId(`time-of-${Prayer.fajr}`)).toHaveTextContent(prayersRes.prayerTimes.fajr);
      expect(getByTestId(`time-of-${Prayer.dhuhr}`)).toHaveTextContent(
        prayersRes.prayerTimes.dhuhr
      );
      expect(getByTestId(`time-of-${Prayer.asr}`)).toHaveTextContent(prayersRes.prayerTimes.asr);
      expect(getByTestId(`time-of-${Prayer.maghrib}`)).toHaveTextContent(
        prayersRes.prayerTimes.maghrib
      );
      expect(getByTestId(`time-of-${Prayer.isha}`)).toHaveTextContent(prayersRes.prayerTimes.isha);
    });
  });

  it("Should show location access failure message", async () => {
    getAPILocationInfo.mockImplementationOnce(() => null);

    const { getByTestId } = render(<PrayerTimes />);

    await waitFor(() => {
      expect(getByTestId("prayer-times-failure-msg")).toHaveTextContent(/location/gi);
      expect(getByTestId("prayer-times-retry-btn")).toBeInTheDocument();
    });
  });

  it("Should retry on failed location access", async () => {
    getAPILocationInfo.mockImplementationOnce(() => null);

    const { getByTestId, queryByTestId } = render(<PrayerTimes />);

    triggerSuccessfullPrayerTimesMock();

    await waitFor(() => {
      expect(getByTestId("prayer-times-failure-msg")).toBeInTheDocument();
      fireEvent.click(getByTestId("prayer-times-retry-btn"));
    });

    await waitFor(() => {
      expect(queryByTestId("prayer-times-failure-msg")).toBeFalsy();
    });
  });

  it("Should show prayer times API failure message", async () => {
    getAPILocationInfo.mockImplementationOnce(() => getFakeUserLocation());
    getAPIPrayerTimes.mockImplementationOnce(() => getFakePrayersFailureResponse());

    const { getByTestId } = render(<PrayerTimes />);

    await waitFor(() => {
      expect(getByTestId("prayer-times-failure-msg")).toHaveTextContent(/Failed to get/gi);
      expect(getByTestId("prayer-times-retry-btn")).toBeInTheDocument();
    });
  });

  it("Should retry on getting prayer times API failure", async () => {
    getAPILocationInfo.mockImplementationOnce(() => getFakeUserLocation());
    getAPIPrayerTimes.mockImplementationOnce(() => getFakePrayersFailureResponse());

    const { getByTestId, queryByTestId } = render(<PrayerTimes />);

    triggerSuccessfullPrayerTimesMock();

    await waitFor(() => {
      expect(getByTestId("prayer-times-failure-msg")).toBeInTheDocument();
      fireEvent.click(getByTestId("prayer-times-retry-btn"));
    });

    await waitFor(() => {
      expect(queryByTestId("prayer-times-failure-msg")).toBeFalsy();
    });
  });

  it("Should toggle the prayer times modal", async () => {
    const res = getFakePrayersResponse();
    getAPIPrayerTimes.mockResolvedValueOnce({ res });

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

function triggerSuccessfullPrayerTimesMock() {
  getAPILocationInfo.mockImplementationOnce(() => getFakeUserLocation());
  getAPIPrayerTimes.mockImplementationOnce(() => getFakePrayersResponse());
}

function getFakeUserLocation() {
  return {
    ip: "1234",
    latitude: 10,
    longitude: 30,
    success: true,
  };
}

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

function getFakePrayersFailureResponse() {
  return { success: false };
}
