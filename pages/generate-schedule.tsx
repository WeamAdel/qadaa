import type { NextPage } from "next";
import { useContext } from "react";
import Tabs from "../components/GenerateSchedule/Tabs";

import Page from "../components/Layout/Page/Page";
import { LangContext } from "../Providers/Language";

const GenerateSchedule: NextPage = () => {
  const { schedulePageTitle } = useContext(LangContext);

  return (
    <Page title={schedulePageTitle} alias="generate-schedule">
      <div className="container">
        <h1 className="sr-only">Generate Prayers Schedule</h1>
        <Tabs />
      </div>
    </Page>
  );
};

export default GenerateSchedule;
