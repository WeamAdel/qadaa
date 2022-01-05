import { useContext } from "react";
import { LangContext } from "../../Providers/Language";
import PrimaryIconLinkButton from "../Buttons/PrimaryIconLinkButton";
import { Add } from "@mui/icons-material";
import Route from "../../settings/routes";

function Heading() {
  const { generateSchedule, siteName, homeDescription } = useContext(LangContext);

  return (
    <div className="home__heading-wrapper">
      <h1 className="home__heading">{siteName}</h1>
      <p className="home__desc">{homeDescription}</p>
      <PrimaryIconLinkButton
        title={generateSchedule}
        url={Route.generate}
        classes="home__generate-btn"
      >
        <Add />
      </PrimaryIconLinkButton>
    </div>
  );
}

export default Heading;
