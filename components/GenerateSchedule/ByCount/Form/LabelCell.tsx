import { useContext } from "react";
import { LangContext } from "../../../../Providers/Language";
import Label from "../../../Form/Label";
import PrayerColumn from "../../../PrayersTable/PrayerCell";

interface LabelCell {
  prayerName: string;
}

function LabelCell({ prayerName }: LabelCell) {
  const lang = useContext(LangContext);
  const id = "prayer-" + prayerName;

  return (
    <PrayerColumn>
      <Label htmlFor={id} label={lang[prayerName]} classes="prayer-count__label" />
    </PrayerColumn>
  );
}

export default LabelCell;
