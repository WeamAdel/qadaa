import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab as TabEnum, TabInterface } from "../../types/Tabs";
import ByYears from "./ByYears/ByYears";
import ByTimeRage from "./ByTimeRage/ByTimeRage";
import ByCount from "./ByCount/ByCount";
import { LangContext } from "../../Providers/Language";

function Tabs({ initTab = TabEnum.byYears }: { initTab?: TabEnum }) {
  const [value, setValue]: [TabEnum, Function] = useState(initTab);
  const { years, timeRange, prayersCount } = useContext(LangContext);

  const tabs: TabInterface[] = [
    { title: years, component: <ByYears selectedValue={value} />, value: TabEnum.byYears },
    {
      title: timeRange,
      component: <ByTimeRage selectedValue={value} />,
      value: TabEnum.byTimeRange,
    },
    { title: prayersCount, component: <ByCount selectedValue={value} />, value: TabEnum.byCount },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabTitlesJSX = tabs.map((tab) => {
    return (
      <Tab key={tab.value} label={tab.title} value={tab.value} itemID={"tab-btn-" + tab.value} />
    );
  });

  const tabContentJSX = tabs.map((tab) => {
    return (
      <TabPanel key={tab.value} value={tab.value}>
        {tab.component}
      </TabPanel>
    );
  });

  return (
    <section className="tabs">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="Choose you schedule type">
              {tabTitlesJSX}
            </TabList>
          </Box>
          {tabContentJSX}
        </TabContext>
      </Box>
    </section>
  );
}

export default Tabs;
