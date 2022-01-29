import { useContext } from "react";
import { useForm } from "react-hook-form";
import { LangContext } from "../../../Providers/Language";
import ErrorMessage from "../../Form/ErrorMessage";
import Label from "../../Form/Label";
import FormWrapper from "../Tab/FormWrapper";
import GenerateButton from "../Tab/GenerateButton";

function Form() {
  const { numberOfYears, yearsRequired, minYears, maxYears } = useContext(LangContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  let errorMessageJSX = <></>;

  if (errors && errors.yearsNum) {
    //@ts-ignore
    errorMessageJSX = <ErrorMessage message={errors.yearsNum.message} />;
  }

  return (
    <FormWrapper onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="form__field">
        <Label label={numberOfYears} htmlFor="yearsNum" isRequired={true} />
        <input
          {...register("yearsNum", {
            required: { value: true, message: yearsRequired },
            min: { value: 1, message: minYears },
            max: { value: 100, message: minYears },
          })}
          className="form__input"
          id="yearsNum"
          name="yearsNum"
          type="number"
          placeholder="0"
        />
      </div>
      {errorMessageJSX}
      <GenerateButton />
    </FormWrapper>
  );
}

export default Form;
