import { useContext } from "react";
import { LangContext } from "../../Providers/Language";

function Heading() {
  const lang = useContext(LangContext);

  return (
    <div className="home__heading-wrapper">
      <h1 className="home__heading">{lang.siteName}</h1>
      <p className="home__desc">{lang.homeDescription}</p>
    </div>
  );
}

export default Heading;
