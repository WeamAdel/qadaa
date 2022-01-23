import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import { Tab as TabEnum } from "../../../types/Tabs";
import Form from "./Form";
import Tab from "../Tab/Tab";

function ByYears({ selectedValue }: { selectedValue: TabEnum }) {
  const { yearsHeading, yearsDesc } = useContext(LangContext);

  const head = {
    heading: yearsHeading,
    description: yearsDesc,
  };

  return (
    <Tab head={head} value={TabEnum.byYears} selectedValue={selectedValue}>
      <Form />
    </Tab>
  );
}

export default ByYears;
