import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PublicIcon from "@mui/icons-material/Public";
import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";

interface ModalHeadingInterface {
  modalTitleId: string;
  hijriDate: string;
  date: string;
  timezone: string;
}

function ModalHeading({ modalTitleId, hijriDate, date, timezone }: ModalHeadingInterface) {
  const { prayerTimes, gregorianDateDesc, hijriDateDesc } = useContext(LangContext);

  return (
    <header>
      <h2 id={modalTitleId} className="prayer-times__heading">
        {prayerTimes}
      </h2>

      <div className="prayer-times__dates">
        <p className="prayer-times__date-wrapper" title={hijriDateDesc}>
          <Brightness7Icon sx={{ width: 14 + "px" }} />
          <span className="sr-only">{hijriDateDesc}</span>
          <time className="prayer-times__date" dateTime={hijriDate}>
            {hijriDate}
          </time>
        </p>

        <p className="prayer-times__date-wrapper" title={gregorianDateDesc}>
          <DarkModeIcon sx={{ width: 14 + "px" }} />
          <span className="sr-only">{gregorianDateDesc}</span>
          <time className="prayer-times__date" dateTime={date}>
            {date}
          </time>
        </p>

        <p className="prayer-times__date-wrapper">
          <PublicIcon sx={{ width: 14 + "px" }} />
          <span className="prayer-times__date">{timezone}</span>
        </p>
      </div>
    </header>
  );
}

export default ModalHeading;
