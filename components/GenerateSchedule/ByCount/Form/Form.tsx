import { ReactNode, useContext, useState } from "react";
import { LangContext } from "../../../../Providers/Language";
import Prayer from "../../../../types/Prayer";
import { PrayersCount } from "../../../../types/Schedule";

import ErrorMessage from "../../../Form/ErrorMessage";
import PrayersTable from "../../../PrayersTable/PrayersTable";
import FormWrapper from "../../Tab/FormWrapper";
import GenerateButton from "../../Tab/GenerateButton";
import FormRowCells from "./FormRowCells";

export const perPrayerMaxCount = 500;

interface Form {
  generateSchedule: (prayersCount: PrayersCount) => void;
}

function Form({ generateSchedule }: Form) {
  //   const { numberOfYears, yearsRequired, minYears, maxYears } = useContext(LangContext);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [maxCountExceeded, setMaxCountExceeded] = useState(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    setIsTouched(true);

    if (isValid() && e.target) {
      const data = getFormData(e.target as HTMLFormElement);
      generateSchedule(data);
    }
  }

  function getFormData(form: HTMLFormElement) {
    const data: FormData = new FormData(form);
    const prayers: PrayersCount = {
      [Prayer.fajr]: 0,
      [Prayer.dhuhr]: 0,
      [Prayer.asr]: 0,
      [Prayer.maghrib]: 0,
      [Prayer.isha]: 0,
    };

    for (let prayer of data) {
      const prayerName = prayer[0] as Prayer;

      if (prayerName in Prayer) {
        prayers[prayerName] = +prayer[1];
      }
    }

    return prayers;
  }

  function isValid() {
    return !(maxCountExceeded || isEmpty);
  }

  function getFormRowCells() {
    const cells: { [indes: string]: ReactNode } = {};

    for (let prayer in Prayer) {
      cells[prayer] = <FormRowCells prayerName={prayer} validate={validate} />;
    }

    return cells;
  }

  function validate() {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".prayer-count__input");
    let isEmpty = true;
    let maxExceeded = false;

    for (let input of inputs) {
      const value = +input.value;

      isEmpty = value > 0 ? false : isEmpty;
      maxExceeded = value > perPrayerMaxCount ? true : maxExceeded;
    }

    setIsEmpty(isEmpty);
    setMaxCountExceeded(maxExceeded);
  }

  let errorMessages = [];

  if (isTouched) {
    if (isEmpty) errorMessages.push("Please enter at leats one prayer count");
    if (maxCountExceeded) errorMessages.push("Please enter numbers less than " + perPrayerMaxCount);
  }

  const errorMessagesJSX = errorMessages.map((message, index) => {
    return <ErrorMessage key={"by-count-error-" + index} message={message} />;
  });

  return (
    <FormWrapper onSubmit={onSubmit}>
      <PrayersTable rowCells={getFormRowCells()}></PrayersTable>
      <>{errorMessagesJSX}</>
      <GenerateButton />
    </FormWrapper>
  );
}

export default Form;
