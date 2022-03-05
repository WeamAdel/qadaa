import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import ProgressSpinner from "../../Spinners/ProgressSpinner";

function Loading() {
  const { waitScheduleGeneration } = useContext(LangContext);

  return (
    <div className="generate-modal__content generate-modal__content--loading">
      <ProgressSpinner classes="generate-modal__icon" />
      <p className="generate-modal__desc">
        {waitScheduleGeneration} <span aria-hidden="true">...</span>
      </p>
    </div>
  );
}

export default Loading;
