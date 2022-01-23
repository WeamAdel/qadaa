interface FormWrapperInterface {
  onSubmit: Function;
  handleSubmit: Function;
  children: JSX.Element[];
}

function FormWrapper({ onSubmit, handleSubmit, children }: FormWrapperInterface) {
  return (
    <div className="tabs__form-wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </div>
  );
}

export default FormWrapper;
