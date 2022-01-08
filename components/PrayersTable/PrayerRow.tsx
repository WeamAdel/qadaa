import { ReactNode } from "react";
import Prayer from "../../types/Prayer";

import PrayerIcon from "./PrayerIcon";

interface PrayerRowInterface {
  prayerName: Prayer;
  iconAlt: string;
  children: ReactNode;
  props?: any;
}

function PrayerRow({ prayerName, iconAlt, children, ...props }: PrayerRowInterface) {
  return (
    <tr className={`prayers-table__row`} {...props}>
      <PrayerIcon name={prayerName} alt={iconAlt} />
      {children}
    </tr>
  );
}

export default PrayerRow;
