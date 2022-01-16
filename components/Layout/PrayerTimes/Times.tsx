import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";

import PrayersTable from "../../PrayersTable/PrayersTable";
import CloseButton from "./CloseButton";
import ModalHeader from "./ModalHeader";
import PrayerInfoCols from "./PrayerInfoCols";
import FailureMessage from "./FailureMessage";

import getAPIPrayerTimes from "../../../api/prayer-times";
import { formatDate, formatHejriDate } from "../../utils/utils";

import Language from "../../../types/Language";
import Prayer from "../../../types/Prayer";
import { FailureResponse, SuccessResponse } from "../../../types/api/prayer-times";
import { LangContext } from "../../../Providers/Language";

interface TimesInterface {
  modalTitleId: string;
  modalDescId: string;
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

function Times({ modalTitleId, modalDescId, closeModal }: TimesInterface) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime>(initialPrayerTimes);
  const [dates, setDates] = useState<Dates>(initialDates);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);
  const [apiFailed, setAPIFailed] = useState(false);
  const { locale = Language.en } = useRouter() || {};
  const { prayerTimeAPIFailed } = useContext(LangContext);

  useEffect(() => {
    getPrayerTimes();
  }, []);

  function getPrayerTimes() {
    navigator.geolocation.getCurrentPosition(handleGeolocationSuccess);
  }

  async function handleGeolocationSuccess(position: GeolocationPosition) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    const result = await getAPIPrayerTimes(long, lat);

    if (result.success) {
      updatePrayerTimes(result as SuccessResponse);
      setAPIFailed(false);
    } else {
      handleAPIRequestFailure(result as FailureResponse);
    }
  }

  function updatePrayerTimes({ prayerTimes, timestamp, timezone }: SuccessResponse) {
    const hijriDate = formatHejriDate(timestamp, locale);
    const date = formatDate(timestamp);

    setPrayerTimes(prayerTimes);
    setDates({
      hijriDate,
      date,
      timezone,
    });
  }

  function handleAPIRequestFailure(result: FailureResponse) {
    console.log(result);
    setAPIFailed(true);
  }

  function getColumns() {
    const columns: { [index: string]: ReactNode } = {};

    for (let prayerName in prayerTimes) {
      columns[prayerName] = <PrayerInfoCols name={prayerName} time={prayerTimes[prayerName]} />;
    }

    return columns;
  }

  const accessDeinedMsgJSX = locationAccessDenied ? (
    <FailureMessage message={"Access denied"} />
  ) : null;

  const apiFailure = apiFailed ? (
    <FailureMessage message={prayerTimeAPIFailed} onRetry={getPrayerTimes} />
  ) : null;

  const prayersTableJSX = <PrayersTable columns={getColumns()} />;

  const modalBody = accessDeinedMsgJSX || apiFailure || prayersTableJSX;

  return (
    <div>
      <CloseButton closeModal={closeModal} />
      <div className="prayer-times__times">
        <ModalHeader
          modalTitleId={modalTitleId}
          hijriDate={dates.hijriDate}
          date={dates.date}
          timezone={dates.timezone}
        />
        <hr />
        {modalBody}
      </div>
    </div>
  );
}

export default Times;
