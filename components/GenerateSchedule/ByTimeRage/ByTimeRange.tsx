import { useContext, useState } from "react";
import { LangContext } from "../../../Providers/Language";
import { DateRange } from "../../../types/Schedule";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";
import Form from "./Form";
import Schedule from "./Schedule";

function ByTimeRange({ selectedValue }: { selectedValue: TabEnum }) {
  const { timeRangeHeading, timeRangeDesc } = useContext(LangContext);
  const [dateRange, setDateRange]: [DateRange | null, any] = useState(null);

  const head = {
    heading: timeRangeHeading,
    description: timeRangeDesc,
  };

  function resetForm() {
    setDateRange(null);
  }

  function generateSchedule(dateRange: DateRange) {
    setDateRange(dateRange);
  }

  return (
    <Tab head={head} value={TabEnum.TimeRange} selectedValue={selectedValue}>
      <Form generateSchedule={generateSchedule} />
      {dateRange ? <Schedule dateRange={dateRange} resetForm={resetForm} /> : null}
    </Tab>
  );
}

export default ByTimeRange;
