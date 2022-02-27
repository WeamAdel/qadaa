import { useContext, useState } from "react";
import { LangContext } from "../../../Providers/Language";
import { PrayersCount } from "../../../types/Schedule";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";
import Form from "./Form/Form";
import Schedule from "./Schedule";

function ByCount({ selectedValue }: { selectedValue: TabEnum }) {
  const [prayersCount, setPrayersCount]: [PrayersCount | null, any] = useState(null);
  const { prayersCountHeading, prayersCountDesc } = useContext(LangContext);

  const head = {
    heading: prayersCountHeading,
    description: prayersCountDesc,
  };

  function generateSchedule(prayersCount: PrayersCount) {
    setPrayersCount(prayersCount);
  }

  function resetForm() {
    setPrayersCount(null);
  }

  return (
    <Tab head={head} value={TabEnum.Count} selectedValue={selectedValue}>
      <Form generateSchedule={generateSchedule} />
      {prayersCount ? <Schedule prayersCount={prayersCount} resetForm={resetForm} /> : null}
    </Tab>
  );
}

export default ByCount;
