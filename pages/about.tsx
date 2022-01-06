import type { NextPage } from "next";
import { useContext } from "react";

import Heading from "../components/Home/Heading";
import Page from "../components/Layout/Page/Page";
import { LangContext } from "../Providers/Language";

const About: NextPage = () => {
  const lang = useContext(LangContext);

  return (
    <Page title={lang.about}>
      <h1>About</h1>
    </Page>
  );
};

export default About;
