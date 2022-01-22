import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab as TabEnum, TabInterface } from "../../types/Tabs";
import ByYears from "./ByYears/ByYears";
import ByTimeRage from "./ByTimeRage/ByTimeRage";
import ByCount from "./ByCount/ByCount";

function Tabs() {
  const [value, setValue]: [TabEnum, Function] = useState(TabEnum.byYears);

  const tabs: TabInterface[] = [
    { title: "Years", component: <ByYears />, value: TabEnum.byYears },
    { title: "Time Range", component: <ByTimeRage />, value: TabEnum.byTimeRange },
    { title: "Prayers Count", component: <ByCount />, value: TabEnum.byCount },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabTitlesJSX = tabs.map((tab) => {
    return <Tab key={tab.value} label={tab.title} value={tab.value} />;
  });

  const tabContentJSX = tabs.map((tab) => {
    return (
      <TabPanel key={tab.value} value={tab.value}>
        {tab.component}
      </TabPanel>
    );
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Choose you schedule type">
            {tabTitlesJSX}
          </TabList>
        </Box>
        {tabContentJSX}
      </TabContext>
    </Box>
  );
}

export default Tabs;
