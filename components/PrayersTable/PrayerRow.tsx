import { ReactNode } from "react";
import Prayer from "../../types/Prayer";

import PrayerIcon from "./PrayerIcon";

interface PrayerRowInterface {
  prayerName: Prayer;
  icon: ReactNode;
  children: ReactNode;
  props?: any;
}

function PrayerRow({ prayerName, icon, children, ...props }: PrayerRowInterface) {
  return (
    <tr className={`prayers-table__row`} {...props}>
      <PrayerIcon name={prayerName}>{icon}</PrayerIcon>
      {children}
    </tr>
  );
}

export default PrayerRow;
