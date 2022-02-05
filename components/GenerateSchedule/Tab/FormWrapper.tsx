import { MutableRefObject, useRef } from "react";

interface FormWrapperInterface {
  onSubmit: Function;
  children: JSX.Element[];
  handleSubmit?: Function;
}

function FormWrapper({ onSubmit, children, handleSubmit }: FormWrapperInterface) {
  return (
    <div className="tabs__form-wrapper">
      <form className="form tabs__form" onSubmit={handleSubmit ? handleSubmit(onSubmit) : onSubmit}>
        {children}
      </form>
    </div>
  );
}

export default FormWrapper;
