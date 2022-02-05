import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";

import PrayerCell from "../../PrayersTable/PrayerCell";

function PrayerInfoCells({ name, time }: { name: string; time: string }) {
  const lang = useContext(LangContext);
  return (
    <>
      <PrayerCell type="name">{lang[name]}</PrayerCell>
      <PrayerCell>{time}</PrayerCell>
    </>
  );
}

export default PrayerInfoCells;
