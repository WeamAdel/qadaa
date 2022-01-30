import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";

function GenerateButton() {
  const { generate } = useContext(LangContext);

  return (
    <button
      data-testid="generate-form-submit"
      type="submit"
      className="form__submit-btn button button--primary"
    >
      {generate}
    </button>
  );
}

export default GenerateButton;
