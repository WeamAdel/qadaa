import { ReactNode } from "react";

interface PrayerColumnInterface {
  children: ReactNode;
  classes?: string;
  type?: string;
  testid?: string | null;
}

function PrayerColumn({ children, classes = "", type = "", testid = null }: PrayerColumnInterface) {
  return (
    <td
      className={`prayers-table__col ${classes} ${type ? `prayers-table__col-${type}` : ""}`}
      data-testid={testid}
    >
      {children}
    </td>
  );
}

export default PrayerColumn;
