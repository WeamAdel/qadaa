import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import Tab from "../Tab/Tab";

function ByYears() {
  const { yearsHeading, yearsDesc } = useContext(LangContext);

  const head = {
    heading: yearsHeading,
    description: yearsDesc,
  };
  return (
    <Tab head={head}>
      <div>form here</div>
    </Tab>
  );
}

export default ByYears;
