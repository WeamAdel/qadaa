interface LabelInterface {
  label: string;
  htmlFor: string;
  isRequired?: boolean;
}

function Label({ label, htmlFor, isRequired = false }: LabelInterface) {
  const requiredJSX = isRequired ? (
    <span className="form__label-required" aria-label="Required" title="Required">
      *
    </span>
  ) : null;

  return (
    <label className="form__label" htmlFor={htmlFor}>
      {label}
      {requiredJSX}
    </label>
  );
}

export default Label;
