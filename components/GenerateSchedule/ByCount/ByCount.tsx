import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import { Tab as TabEnum } from "../../../types/Tabs";
import Tab from "../Tab/Tab";
import Form from "./Form/Form";

function ByCount({ selectedValue }: { selectedValue: TabEnum }) {
  const { prayersCountHeading, prayersCountDesc } = useContext(LangContext);

  const head = {
    heading: prayersCountHeading,
    description: prayersCountDesc,
  };

  return (
    <Tab head={head} value={TabEnum.byCount} selectedValue={selectedValue}>
      <Form />
    </Tab>
  );
}

export default ByCount;
