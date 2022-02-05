import InputCell from "./InputCell";
import LabelCell from "./LabelCell";

interface FormRowCells {
  prayerName: string;
  validate: (value: number) => void;
}

function FormRowCells({ prayerName, validate }: FormRowCells) {
  return (
    <>
      <LabelCell prayerName={prayerName} />
      <InputCell prayerName={prayerName} validate={validate} />
    </>
  );
}

export default FormRowCells;
