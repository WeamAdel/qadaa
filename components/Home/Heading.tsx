import { useContext } from "react";
import { LangContext } from "../../Providers/Language";
import LinkButton from "../Buttons/LinkButton";
import { Add } from "@mui/icons-material";
import Route from "../../settings/routes";

function Heading() {
  const { generateSchedule, siteName, homeDescription } = useContext(LangContext);

  return (
    <div className="home__heading-wrapper">
      <h1 className="home__heading">{siteName}</h1>
      <p className="home__desc">{homeDescription}</p>
      <LinkButton title={generateSchedule} url={Route.generate} classes="home__generate-btn">
        <Add />
      </LinkButton>
    </div>
  );
}

export default Heading;
