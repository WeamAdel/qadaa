import { ChangeEvent, useState } from "react";
import PrayerColumn from "../../../PrayersTable/PrayerCell";

interface InputCell {
  prayerName: string;
  validate: (value: number) => void;
}

function InputCell({ prayerName, validate }: InputCell) {
  const id = "prayer-" + prayerName;
  const [value, setValue] = useState(0);

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = +e.target.value;
    if (value >= 0) {
      setValue(value);
      validate(value);
    }
  }

  return (
    <PrayerColumn>
      <input
        value={value}
        id={id}
        name={prayerName}
        data-testid={id}
        type="number"
        className="form__input prayer-count__input"
        onChange={onInputChange}
      />
    </PrayerColumn>
  );
}

export default InputCell;
