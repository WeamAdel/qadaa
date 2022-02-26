import { useContext, useState } from "react";
import { LangContext } from "../../../Providers/Language";
import { PrayerCount } from "../../../types/Schedule";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";
import Form from "./Form/Form";

function ByCount({ selectedValue }: { selectedValue: TabEnum }) {
  const [prayersCount, setPrayersCount]: [PrayerCount | null, any] = useState(null);
  const { prayersCountHeading, prayersCountDesc } = useContext(LangContext);

  const head = {
    heading: prayersCountHeading,
    description: prayersCountDesc,
  };

  function generateSchedule(prayersCount: PrayerCount) {
    setPrayersCount(prayersCount);
  }

  return (
    <Tab head={head} value={TabEnum.Count} selectedValue={selectedValue}>
      <Form generateSchedule={generateSchedule} />
    </Tab>
  );
}

export default ByCount;
