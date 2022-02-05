interface LabelInterface {
  label: string;
  htmlFor: string;
  isRequired?: boolean;
  classes?: string;
}

function Label({ label, htmlFor, isRequired = false, classes = "" }: LabelInterface) {
  const requiredJSX = isRequired ? (
    <span className="form__label-required" aria-label="Required" title="Required">
      *
    </span>
  ) : null;

  return (
    <label className={`form__label ${classes}`} htmlFor={htmlFor}>
      {label}
      {requiredJSX}
    </label>
  );
}

export default Label;
