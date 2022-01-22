import { TabHeadInterface } from "../../../types/Tabs";
import TabBody from "./TabBody";
import TabHead from "./TabHead";

interface TabInterface {
  head: TabHeadInterface;
  children: JSX.Element;
}

function Tab({ head, children }: TabInterface) {
  return (
    <div>
      <TabHead heading={head.heading} description={head.description} />
      <hr />
      <TabBody>{children}</TabBody>
    </div>
  );
}

export default Tab;
