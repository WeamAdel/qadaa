import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import PrayerColumn from "../../PrayersTable/PrayerColumn";

function PrayerInfoCols({ name, time }: { name: string; time: string }) {
  const lang = useContext(LangContext);
  return (
    <>
      <PrayerColumn type="name">{lang[name]}</PrayerColumn>
      <PrayerColumn>{time}</PrayerColumn>
    </>
  );
}

export default PrayerInfoCols;
