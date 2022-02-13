import { ReactNode } from "react";
import { Tab as TabEnum, TabHeadInterface } from "../../../types/Tabs";
import TabBody from "./TabBody";
import TabHead from "./TabHead";

interface TabInterface {
  head: TabHeadInterface;
  value: TabEnum;
  selectedValue: TabEnum;
  children: ReactNode;
}

function Tab({ head, value, selectedValue, children }: TabInterface) {
  return (
    <div data-testid={"tab-" + value} data-selected={selectedValue === value}>
      <TabHead heading={head.heading} description={head.description} />
      <hr />
      <TabBody>{children}</TabBody>
    </div>
  );
}

export default Tab;
