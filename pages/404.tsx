import { useContext } from "react";
import { LangContext } from "../Providers/Language";

import ErrorPageWrapper from "../components/Layout/ErrorPageWrapper";
import Page from "../components/Layout/Page/Page";
import LinkButton from "../components/Buttons/LinkButton";
import ButtonCategory from "../types/ButtonCategory";
import NotFoundSVG from "../components/SVG/NotFoundSVG";

function NotFound() {
  const { notFoundHeading, notFoundDescription, goBackHome } = useContext(LangContext);

  return (
    <Page title="Not found" alias="not-found">
      <ErrorPageWrapper
        heading={notFoundHeading}
        description={notFoundDescription}
        image={<NotFoundSVG></NotFoundSVG>}
      >
        <LinkButton title={goBackHome} url="/" category={ButtonCategory.Tertiary} />
      </ErrorPageWrapper>
    </Page>
  );
}

export default NotFound;
