import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { LangContext } from "../../../Providers/Language";

import PrayersTable from "../../PrayersTable/PrayersTable";
import CloseButton from "./CloseButton";
import ModalHeader from "./ModalHeader";
import PrayerInfoCells from "./PrayerInfoCells";
import FailureMessage from "./FailureMessage";

import getAPIPrayerTimes from "../../../api/prayer-times";
import { formatDate, formatHejriDate } from "../../../utils/utils";

import Language from "../../../types/Language";
import Prayer from "../../../types/Prayer";
import { FailureResponse, SuccessResponse } from "../../../types/api/prayer-times";
import { GeolocationErrorCode } from "../../../types/Geolocation";

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
  const [locationAccessFailureMsg, setLocationAccessFailureMsg] = useState("");
  const [apiFailed, setAPIFailed] = useState(false);
  const { locale = Language.en } = useRouter() || {};
  const { prayerTimeAPIFailed, permissionDenied, possitionUnavailable, timeout } =
    useContext(LangContext);

  useEffect(() => {
    /* Get prayers only when the modal is open and no data is set yet, 
      otherwise the location permission prompt will popup on first page load
      with modal keepMounted set to true.
    */
    if (isOpen && !dates.timezone) {
      getPrayerTimes();
    }
  }, [isOpen]);

  function getPrayerTimes() {
    navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationFailure);
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

    setLocationAccessFailureMsg("");
  }

  const geoloactionErrors: { [index: number]: string } = {
    [GeolocationErrorCode.permissionDenied]: permissionDenied,
    [GeolocationErrorCode.possitionUnavailable]: possitionUnavailable,
    [GeolocationErrorCode.timeout]: timeout,
  };

  async function handleGeolocationFailure({ code }: GeolocationPositionError) {
    console.log(geoloactionErrors[code]);
    setLocationAccessFailureMsg(geoloactionErrors[code]);

    retryOnDeclinedLocationRequest();
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

  function retryOnDeclinedLocationRequest() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(({ state }) => {
        if (state === "prompt") {
          getPrayerTimes();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getRowCells() {
    const rowCells: { [index: string]: ReactNode } = {};

    for (let prayerName in prayerTimes) {
      rowCells[prayerName] = <PrayerInfoCells name={prayerName} time={prayerTimes[prayerName]} />;
    }

    return rowCells;
  }

  const accessDeinedMsgJSX = locationAccessFailureMsg ? (
    <FailureMessage message={locationAccessFailureMsg} />
  ) : null;

  const apiFailure = apiFailed ? (
    <FailureMessage message={prayerTimeAPIFailed} onRetry={getPrayerTimes} />
  ) : null;

  const prayersTableJSX = <PrayersTable rowCells={getRowCells()} />;

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
        <div id={modalDescId}>{modalBody}</div>
      </div>
    </div>
  );
}

export default Times;
