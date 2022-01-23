import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";

function ByCount({ selectedValue }: { selectedValue: TabEnum }) {
  const { prayersCountHeading, prayersCountDesc } = useContext(LangContext);

  const head = {
    heading: prayersCountHeading,
    description: prayersCountDesc,
  };

  return (
    <Tab head={head} value={TabEnum.byCount} selectedValue={selectedValue}>
      <div>form here</div>
    </Tab>
  );
}

export default ByCount;
