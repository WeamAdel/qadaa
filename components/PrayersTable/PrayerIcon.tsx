import { ReactNode } from "react";
import Prayer from "../../types/Prayer";
import PrayerCell from "./PrayerCell";

function PrayerIcon({ name, children }: { name: Prayer; children: ReactNode }) {
  return (
    <PrayerCell classes={`prayers-table__${name}-icon`} type="icon">
      {children}
    </PrayerCell>
  );
}

export default PrayerIcon;
