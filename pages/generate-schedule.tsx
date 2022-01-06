import type { NextPage } from "next";
import { useContext } from "react";

import Page from "../components/Layout/Page/Page";
import { LangContext } from "../Providers/Language";

const GenerateSchedule: NextPage = () => {
  const { schedulePageTitle } = useContext(LangContext);

  return (
    <Page title={schedulePageTitle} alias="generate-schedule">
      <h1 data-testid="">Generate Schedule</h1>
    </Page>
  );
};

export default GenerateSchedule;
