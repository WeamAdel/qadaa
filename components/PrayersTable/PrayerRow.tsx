import { ReactNode, useContext } from "react";
import { LangContext } from "../../Providers/Language";
import Prayer from "../../types/Prayer";
import PrayerCell from "./PrayerCell";

import PrayerIcon from "./PrayerIcon";

interface PrayerRowInterface {
  prayerName: Prayer;
  icon: ReactNode;
  children: ReactNode;
  props?: any;
}

function PrayerRow({ prayerName, icon, children, ...props }: PrayerRowInterface) {
  const lang = useContext(LangContext);

  return (
    <tr className={`prayers-table__row`} {...props}>
      <PrayerIcon name={prayerName}>{icon}</PrayerIcon>
      <PrayerCell type="name">{lang[prayerName]}</PrayerCell>
      {children}
    </tr>
  );
}

export default PrayerRow;
