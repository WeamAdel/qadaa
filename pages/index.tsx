import type { NextPage } from "next";
import { useContext } from "react";
import { LangContext } from "../components/Lang/Lang";

import Heading from "../components/Home/Heading";
import Page from "../components/Layout/Page/Page";

const Home: NextPage = () => {
  const lang = useContext(LangContext);

  return (
    <Page pageTitle={lang.homePageTitle}>
      <Heading />
    </Page>
  );
};

export default Home;
