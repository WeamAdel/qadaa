import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import getAPIPrayerTimes, { FailureResponse, SuccessResponse } from "../../../api/prayer-times";
import Language from "../../../types/Language";
import Prayer from "../../../types/Prayer";
import PrayersTable from "../../PrayersTable/PrayersTable";
import { formatDate, formatHejriDate } from "../../utils/utils";
import CloseButton from "./CloseButton";
import ModalHeader from "./ModalHeader";
import PrayerInfoCols from "./PrayerInfoCols";

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
  const { locale = Language.en } = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      const result = await getAPIPrayerTimes(long, lat);

      if (result.success) {
        updatePrayerTimes(result as SuccessResponse);
      } else {
        handleAPIRequestFailure(result as FailureResponse);
      }
    });
  }, []);

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
  }

  function getColumns() {
    const columns: { [index: string]: ReactNode } = {};

    for (let prayerName in prayerTimes) {
      columns[prayerName] = <PrayerInfoCols name={prayerName} time={prayerTimes[prayerName]} />;
    }

    return columns;
  }

  return (
    <div className="prayer-times__times">
      <CloseButton closeModal={closeModal} />
      <ModalHeader
        modalTitleId={modalTitleId}
        hijriDate={dates.hijriDate}
        date={dates.date}
        timezone={dates.timezone}
      />
      <hr />
      <PrayersTable columns={getColumns()} />
    </div>
  );
}

export default Times;