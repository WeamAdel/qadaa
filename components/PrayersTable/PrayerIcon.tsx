import { ReactNode } from "react";
import Prayer from "../../types/Prayer";
import PrayerColumn from "./PrayerColumn";

function PrayerIcon({ name, children }: { name: Prayer; children: ReactNode }) {
  return (
    <PrayerColumn classes={`prayers-table__${name}-icon`} type="icon">
      {children}
    </PrayerColumn>
  );
}

export default PrayerIcon;
