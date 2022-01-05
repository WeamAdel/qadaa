import type { NextPage } from "next";
import { useContext } from "react";
import { LangContext } from "../components/Lang/Lang";

import Heading from "../components/Home/Heading";
import Page from "../components/Layout/Page/Page";

const About: NextPage = () => {
  const lang = useContext(LangContext);

  return (
    <Page pageTitle={lang.about}>
      <Heading />
    </Page>
  );
};

export default About;
