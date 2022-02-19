import { useContext, useEffect, useState } from "react";
import { Tab as TabEnum } from "../../../types/Tabs";
import { LangContext } from "../../../Providers/Language";
import { ScheduleYearData, YearsCountSchedule } from "../../../models/Schedule";

import Form from "./Form";
import Tab from "../Tab/Tab";
import Schedule from "./Schedule";
import GenerateModal from "../GenerateModal/GenerateModal";

function ByYears({ selectedValue }: { selectedValue: TabEnum }) {
  const { yearsHeading, yearsDesc } = useContext(LangContext);
  const [years, setYears]: [number | null, any] = useState(null);

  const head = {
    heading: yearsHeading,
    description: yearsDesc,
  };

  function generateSchedule(years: number) {
    setYears(years);
  }

  function resetForm() {
    setYears(null);
  }

  return (
    <Tab head={head} value={TabEnum.Years} selectedValue={selectedValue}>
      <Form generateSchedule={generateSchedule} />
      {years ? <Schedule years={years} resetForm={resetForm} /> : null}
    </Tab>
  );
}

export default ByYears;
