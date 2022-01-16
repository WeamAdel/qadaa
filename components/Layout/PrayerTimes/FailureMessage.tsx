import { MouseEventHandler, useContext } from "react";
import { LangContext } from "../../../Providers/Language";

interface FailureMessageInterface {
  message: string;
  onRetry?: MouseEventHandler;
}

function FailureMessage({ message, onRetry }: FailureMessageInterface) {
  const { retry } = useContext(LangContext);
  const retryBtnJSX = onRetry ? (
    <button className="button button--secondary" onClick={onRetry}>
      {retry}
    </button>
  ) : null;

  return (
    <div className="prayer-times__failure" role="alert">
      <p className="prayer-times__failure-message">{message}</p>
      {retryBtnJSX}
    </div>
  );
}

export default FailureMessage;
