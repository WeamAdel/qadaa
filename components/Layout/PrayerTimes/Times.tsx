import { ReactNode, useContext, useEffect, useState } from "react";
import { LangContext } from "../../../Providers/Language";

import PrayersTable from "../../PrayersTable/PrayersTable";
import CloseButton from "../../Buttons/CloseButton";
import ModalHeader from "./ModalHeader";
import PrayerInfoCells from "./PrayerInfoCells";
import FailureMessage from "./FailureMessage";

import { getAPIPrayerTimes, FailureResponse, SuccessResponse } from "../../../api/prayer-times";
import { formatDate, formatHejriDate } from "../../../utils/utils";

import Prayer from "../../../types/Prayer";
import { getAPILocationInfo, LocationSuccessResponse } from "../../../api/location";
import useMyRouter from "../../../hooks/useMyRouter";

interface TimesInterface {
  modalTitleId: string;
  modalDescId: string;
  isOpen: boolean;
  closeModal: () => void;
}

interface Dates {
  hijriDate: string;
  date: string;
  timezone: string;
}

type PrayerTime = {
  [index: string]: string;
};

const initialDates: Dates = {
  hijriDate: "",
  date: "",
  timezone: "",
};

const initialPrayerTimes: PrayerTime = {
  [Prayer.fajr]: "-",
  [Prayer.dhuhr]: "-",
  [Prayer.asr]: "-",
  [Prayer.maghrib]: "-",
  [Prayer.isha]: "-",
};

function Times({ modalTitleId, modalDescId, closeModal, isOpen }: TimesInterface) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime>(initialPrayerTimes);
  const [dates, setDates] = useState<Dates>(initialDates);
  const [locationAccessFailed, setLocationAccessFailed] = useState(false);
  const [apiFailed, setAPIFailed] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { locale  } = useMyRouter();
  const { prayerTimeAPIFailed, locationFailed } = useContext(LangContext);

  useEffect(() => {
    if (!dates.timezone) {
      getPrayerTimes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

  /**
   * Get prayer times
   */
  async function getPrayerTimes() {
    setIsFetching(true);
    const res = await getAPILocationInfo();

    res ? await handleLocationSuccess(res) :await handleLocationFailure();

    setIsFetching(false)

  }

  /**
   * Gets prayer times on location detection success.
   */
  async function handleLocationSuccess({ latitude, longitude }: LocationSuccessResponse) {
    const result = await getAPIPrayerTimes(longitude, latitude);

    if (result && result.success) {
      updatePrayerTimes(result as SuccessResponse);
      setAPIFailed(false);
    } else {
      handleAPIRequestFailure(result as FailureResponse);
    }

    setLocationAccessFailed(false);
  }

  /**
   * Handles after location detection failure.
   */
  async function handleLocationFailure() {
    setLocationAccessFailed(true);
  }

  function updatePrayerTimes({ prayerTimes, timestamp, timezone }: SuccessResponse) {
    const hijriDate = formatHejriDate(timestamp, locale as string);
    const date = formatDate(timestamp);

    setPrayerTimes(prayerTimes);
    setDates({
      hijriDate,
      date,
      timezone,
    });
  }

  function handleAPIRequestFailure(result: FailureResponse) {
    setAPIFailed(true);
  }

  function getRowCells() {
    const rowCells: { [index: string]: ReactNode } = {};

    for (let prayerName in prayerTimes) {
      rowCells[prayerName] = <PrayerInfoCells name={prayerName} time={prayerTimes[prayerName]} />;
    }

    return rowCells;
  }

  const isFailed = locationAccessFailed || apiFailed;
  const failureMsg = locationAccessFailed ? locationFailed : apiFailed ? prayerTimeAPIFailed : '';
  const apiFailure = isFailed ? (
    <FailureMessage message={failureMsg} onRetry={getPrayerTimes} />
  ) : null;

  const prayersTableJSX = <PrayersTable rowCells={getRowCells()} />;
  const modalBody = apiFailure || prayersTableJSX;

  return (
    <div>
      <CloseButton
        title="Close prayer times"
        classes="prayer-times__close-btn"
        testid="prayer-times-close-btn"
        closeModal={closeModal}
      />
      <div className="prayer-times__times modal">
        <ModalHeader
          modalTitleId={modalTitleId}
          hijriDate={dates.hijriDate}
          date={dates.date}
          timezone={dates.timezone}
        />
        <hr />
        {isFetching? "Loading...":  <div id={modalDescId}>{modalBody}</div>}
      </div>
    </div>
  );
}

export default Times;
