import type { NextPage } from "next";
import { useContext } from "react";

import Page from "../components/Layout/Page/Page";
import { LangContext } from "../Providers/Language";

const Donate: NextPage = () => {
  const { donate, donatePageTitle } = useContext(LangContext);

  return (
    <Page title={donatePageTitle} alias="about">
      <h1>{donate}</h1>
    </Page>
  );
};

export default Donate;
