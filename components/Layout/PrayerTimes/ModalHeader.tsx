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

  const hijriDateJSX = hijriDate ? (
    <p className="prayer-times__date-wrapper" title={hijriDateDesc}>
      <Brightness7Icon sx={{ width: 14 + "px" }} />
      <span className="sr-only">{hijriDateDesc}</span>
      <time className="prayer-times__date" dateTime={hijriDate}>
        {hijriDate}
      </time>
    </p>
  ) : null;

  const gregorianDateJSX = date ? (
    <p className="prayer-times__date-wrapper" title={gregorianDateDesc}>
      <DarkModeIcon sx={{ width: 14 + "px" }} />
      <span className="sr-only">{gregorianDateDesc}</span>
      <time className="prayer-times__date" dateTime={date}>
        {date}
      </time>
    </p>
  ) : null;

  const timezoneJSX = timezone ? (
    <p className="prayer-times__date-wrapper">
      <PublicIcon sx={{ width: 14 + "px" }} />
      <span className="prayer-times__date">{timezone}</span>
    </p>
  ) : null;

  const datesFound = hijriDateJSX || gregorianDateJSX || timezoneJSX;
  const datesJSX = datesFound ? (
    <div className="prayer-times__dates">
      {hijriDateJSX}
      {gregorianDateJSX}
      {timezoneJSX}
    </div>
  ) : null;

  return (
    <header>
      <h2 id={modalTitleId} className="prayer-times__heading">
        {prayerTimes}
      </h2>
      {datesJSX}
    </header>
  );
}

export default ModalHeading;
