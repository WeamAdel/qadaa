import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { LangContext } from "../../../Providers/Language";
import { DateRange } from "../../../types/Schedule";
import { DateComparer, dateComparer } from "../../../utils/utils";

import ErrorMessage from "../../Form/ErrorMessage";
import Label from "../../Form/Label";
import FormWrapper from "../Tab/FormWrapper";
import GenerateButton from "../Tab/GenerateButton";

interface Form {
  generateSchedule: (dateRange: DateRange) => void;
}

function Form({ generateSchedule }: Form) {
  const { startDate, endDate, startDateRequired, endDateRequired, rangeError } =
    useContext(LangContext);
  let startDateRef: React.RefObject<HTMLInputElement> = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const startDateRegister = register("startDate", {
    required: { value: true, message: startDateRequired },
  });
  const endDateRegister = register("endDate", {
    validate: endDateValidator,
    required: { value: true, message: endDateRequired },
  });

  function onSubmit(data: DateRange) {
    generateSchedule(data);
  }

  let startErrorMessageJSX = <></>;
  let endErrorMessageJSX = <></>;

  if (errors) {
    if (errors.startDate) {
      //@ts-ignore
      startErrorMessageJSX = <ErrorMessage message={errors.startDate.message} />;
    }

    if (errors.endDate) {
      //@ts-ignore
      endErrorMessageJSX = <ErrorMessage message={errors.endDate.message} />;
    }
  }

  function endDateValidator(endDate: string): boolean | string {
    if (startDateRef && startDateRef.current && startDateRef.current.value) {
      const startDate = startDateRef.current.value;
      const result = dateComparer(startDate, endDate);

      return result === DateComparer.less || rangeError;
    }

    return true;
  }

  return (
    <FormWrapper onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="range__dates-wrapper">
        <div className="form__field range__start-field">
          <Label label={startDate} htmlFor="startDate" isRequired={true} />
          <input
            {...startDateRegister}
            className="form__input"
            id="startDate"
            name="startDate"
            type="date"
            aria-invalid={Boolean(errors?.startDate)}
            ref={(e) => {
              startDateRegister.ref(e);
              //@ts-ignore
              if (startDateRef) startDateRef.current = e;
            }}
            data-testid="range-start"
          />
          {startErrorMessageJSX}
        </div>

        <div className="form__field range__end-field">
          <Label label={endDate} htmlFor="endDate" isRequired={true} />
          <input
            {...endDateRegister}
            aria-invalid={Boolean(errors?.endDate)}
            className="form__input"
            id="endDate"
            name="endDate"
            type="date"
            data-testid="range-end"
          />
          {endErrorMessageJSX}
        </div>
      </div>

      <GenerateButton />
    </FormWrapper>
  );
}

export default Form;
