import { MutableRefObject, ReactNode, Ref, useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LangContext } from "../../../../Providers/Language";
import Prayer from "../../../../types/Prayer";

import ErrorMessage from "../../../Form/ErrorMessage";
import Label from "../../../Form/Label";
import PrayersTable from "../../../PrayersTable/PrayersTable";
import FormWrapper from "../../Tab/FormWrapper";
import GenerateButton from "../../Tab/GenerateButton";
import FormRowCells from "./FormRowCells";

export const maxPrayerCount = 500;

function Form() {
  //   const { numberOfYears, yearsRequired, minYears, maxYears } = useContext(LangContext);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

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

    for (let input of inputs) {
      if (+input.value > 0) {
        isEmpty = false;
        break;
      }
    }

    setIsEmpty(isEmpty);
  }

  let errorMessageJSX = <></>;

  if (isTouched && isEmpty) {
    //@ts-ignore
    errorMessageJSX = <ErrorMessage message={"Please enter at leats one prayer count"} />;
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <PrayersTable rowCells={getFormRowCells()}></PrayersTable>
      {errorMessageJSX}
      <GenerateButton />
    </FormWrapper>
  );
}

export default Form;
