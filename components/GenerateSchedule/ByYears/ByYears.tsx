import { useContext, useEffect, useState } from "react";
import { Tab as TabEnum } from "../../../types/Tabs";
import { LangContext } from "../../../Providers/Language";
import { ScheduleYearData, YearsCountSchedule } from "../../../models/Schedule";

import Form from "./Form";
import Tab from "../Tab/Tab";
import Schedule from "./Schedule";

function ByYears({ selectedValue }: { selectedValue: TabEnum }) {
  const { yearsHeading, yearsDesc } = useContext(LangContext);
  const [scheduleData, setScheduleData]: [Array<ScheduleYearData> | null, any] = useState(null);

  const head = {
    heading: yearsHeading,
    description: yearsDesc,
  };

  function generateSchedule(years: number) {
    setScheduleData(new YearsCountSchedule(years).generateData());
  }

  return (
    <Tab head={head} value={TabEnum.Years} selectedValue={selectedValue}>
      <Form generateSchedule={generateSchedule} />
      {scheduleData ? <Schedule data={scheduleData} /> : <></>}
    </Tab>
  );
}

export default ByYears;
