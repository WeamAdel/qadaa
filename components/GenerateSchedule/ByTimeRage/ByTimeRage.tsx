import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";
import Form from "./Form";

function ByTimeRange({ selectedValue }: { selectedValue: TabEnum }) {
  const { timeRangeHeading, timeRangeDesc } = useContext(LangContext);

  const head = {
    heading: timeRangeHeading,
    description: timeRangeDesc,
  };

  return (
    <Tab head={head} value={TabEnum.TimeRange} selectedValue={selectedValue}>
      <Form />
    </Tab>
  );
}

export default ByTimeRange;
