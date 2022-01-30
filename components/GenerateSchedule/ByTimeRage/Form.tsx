import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { LangContext } from "../../../Providers/Language";
import { DateComparer, dateComparer } from "../../../utils/utils";
import ErrorMessage from "../../Form/ErrorMessage";
import Label from "../../Form/Label";
import FormWrapper from "../Tab/FormWrapper";
import GenerateButton from "../Tab/GenerateButton";

function Form() {
  const { startDate, endDate, startDateRequired, endDateRequired, rangeError } =
    useContext(LangContext);
  let startDateRef: React.RefObject<HTMLInputElement> = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const startDateRegister = register("rangeStart", {
    required: { value: true, message: startDateRequired },
  });
  const endDateRegister = register("rangeEnd", {
    validate: endDateValidator,
    required: { value: true, message: endDateRequired },
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  let startErrorMessageJSX = <></>;
  let endErrorMessageJSX = <></>;

  if (errors) {
    if (errors.rangeStart) {
      //@ts-ignore
      startErrorMessageJSX = <ErrorMessage message={errors.rangeStart.message} />;
    }

    if (errors.rangeEnd) {
      console.log("oj");

      //@ts-ignore
      endErrorMessageJSX = <ErrorMessage message={errors.rangeEnd.message} />;
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
          <Label label={startDate} htmlFor="rangeStart" isRequired={true} />
          <input
            {...startDateRegister}
            className="form__input"
            id="rangeStart"
            name="rangeStart"
            type="date"
            aria-invalid={Boolean(errors?.rangeStart)}
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
          <Label label={endDate} htmlFor="rangeEnd" isRequired={true} />
          <input
            {...endDateRegister}
            aria-invalid={Boolean(errors?.rangeEnd)}
            className="form__input"
            id="rangeEnd"
            name="rangeEnd"
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
