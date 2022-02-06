import { ReactNode, Ref, useContext, useState } from "react";
import { LangContext } from "../../../../Providers/Language";
import Prayer from "../../../../types/Prayer";

import ErrorMessage from "../../../Form/ErrorMessage";
import PrayersTable from "../../../PrayersTable/PrayersTable";
import FormWrapper from "../../Tab/FormWrapper";
import GenerateButton from "../../Tab/GenerateButton";
import FormRowCells from "./FormRowCells";

export const perPrayerMaxCount = 500;

function Form() {
  //   const { numberOfYears, yearsRequired, minYears, maxYears } = useContext(LangContext);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [maxCountExceeded, setMaxCountExceeded] = useState(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    setIsTouched(true);
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
