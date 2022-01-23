import { useForm } from "react-hook-form";
import ErrorMessage from "../../Form/ErrorMessage";
import Label from "../../Form/Label";
import FormWrapper from "../Tab/FormWrapper";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  console.log(errors);

  const messages = {
    required: "This field is required",
    min: "Years can not be less than 1",
    max: "Years can not be more than 120",
  };

  let errorMessageJSX = <></>;

  if (errors && errors.yearsNum) {
    //@ts-ignore
    errorMessageJSX = <ErrorMessage message={messages[errors.yearsNum.type]} />;
  }

  return (
    <FormWrapper onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="form__field">
        <Label label="Number of years" htmlFor="yearsNum" isRequired={true} />
        <input
          {...register("yearsNum", { required: true, min: 1, max: 120 })}
          className="form__input"
          id="yearsNum"
          name="yearsNum"
          type="number"
          placeholder="0"
        />
      </div>
      {errorMessageJSX}
      <button type="submit" className="form__submit-btn button button--primary">
        Generate Schedule
      </button>
    </FormWrapper>
  );
}

export default Form;
