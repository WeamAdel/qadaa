import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab as TabEnum, TabInterface, tabValues } from "../../types/Tabs";
import ByYears from "./ByYears/ByYears";
import ByTimeRage from "./ByTimeRage/ByTimeRange";
import ByCount from "./ByCount/ByCount";
import { LangContext } from "../../Providers/Language";
import { getPageURLHash } from "../../utils/utils";
import Route from "../../settings/routes";
import "../../fonts/Amiri";
import useMyRouter from "../../hooks/useMyRouter";

function Tabs({ initTab = TabEnum.Years }: { initTab?: TabEnum }) {
  const [value, setValue]: [TabEnum, Function] = useState(initTab);
  const [hash, setHash]: [TabEnum | -1 | null, Function] = useState(null);
  const { years, timeRange, prayersCount } = useContext(LangContext);
  const router = useMyRouter();

  useEffect(() => {
    if (!hash && router) {
      setCurrentTabFromHash();
    }
  }, [router, hash]);

  function setCurrentTabFromHash() {
    const hash = getPageURLHash();

    if (hash && tabValues.includes(hash)) {
      setValue(hash);
    } else {
      setHash(-1);
    }
  }

  const tabs: TabInterface[] = [
    { title: years, component: <ByYears selectedValue={value} />, value: TabEnum.Years },
    {
      title: timeRange,
      component: <ByTimeRage selectedValue={value} />,
      value: TabEnum.TimeRange,
    },
    { title: prayersCount, component: <ByCount selectedValue={value} />, value: TabEnum.Count },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.replace({ pathname: Route.generate, hash: newValue });
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
