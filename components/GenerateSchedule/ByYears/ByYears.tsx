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
  const [scheduleData, setScheduleData]: [Array<ScheduleYearData> | null, any] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [saveButton, setSaveButton]: [HTMLButtonElement | undefined, any] = useState();
  const [years, setYears]: [number | null, any] = useState(null);

  useEffect(() => {
    if (years && !isNaN(years)) {
      setScheduleData(new YearsCountSchedule(years).generateData());
    }
  }, [years]);

  const head = {
    heading: yearsHeading,
    description: yearsDesc,
  };

  function generateSchedule(years: number) {
    setIsGenerating(true);
    setYears(years);
  }

  function updateGenerated() {
    setIsGenerated(true);
  }

  console.log("is generating? ", isGenerating);

  function save() {
    if (saveButton) {
      saveButton.click();
    }
  }

  return (
    <Tab head={head} value={TabEnum.Years} selectedValue={selectedValue}>
      <Form generateSchedule={generateSchedule} />
      {scheduleData ? (
        <Schedule
          data={scheduleData}
          updateGenerated={updateGenerated}
          setSaveButton={setSaveButton}
        />
      ) : (
        <></>
      )}
      <GenerateModal open={isGenerating} isGenerated={isGenerated} save={save} />
    </Tab>
  );
}

export default ByYears;
