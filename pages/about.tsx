import type { NextPage } from "next";
import { useContext } from "react";

import Page from "../components/Layout/Page/Page";
import { LangContext } from "../Providers/Language";

const About: NextPage = () => {
  const { aboutPageTitle, about } = useContext(LangContext);

  return (
    <Page title={aboutPageTitle} alias="about">
      <h1>{about}</h1>
    </Page>
  );
};

export default About;
