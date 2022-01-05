import type { NextPage } from "next";
import { useContext } from "react";

import Heading from "../components/Home/Heading";
import Page from "../components/Layout/Page/Page";
import { LangContext } from "../Providers/Language";

const Home: NextPage = () => {
  const lang = useContext(LangContext);

  return (
    <Page title={lang.homePageTitle} alias="home">
      <Heading />
    </Page>
  );
};

export default Home;
