import { ReactNode } from "react";

interface PrayerColumnInterface {
  children: ReactNode;
  classes?: string;
  type?: string;
}

function PrayerColumn({ children, classes = "", type = "" }: PrayerColumnInterface) {
  return (
    <td className={`prayers-table__col ${classes} ${type ? `prayers-table__col-${type}` : ""}`}>
      {children}
    </td>
  );
}

export default PrayerColumn;
