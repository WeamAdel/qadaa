import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";

function ByTimeRange({ selectedValue }: { selectedValue: TabEnum }) {
  const { timeRangeHeading, timeRangeDesc } = useContext(LangContext);

  const head = {
    heading: timeRangeHeading,
    description: timeRangeDesc,
  };

  return (
    <Tab head={head} value={TabEnum.byTimeRange} selectedValue={selectedValue}>
      <div>form here</div>
    </Tab>
  );
}

export default ByTimeRange;
