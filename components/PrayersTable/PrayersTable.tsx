import { ReactNode } from "react";
import Prayer from "../../types/Prayer";
import PrayerRow from "./PrayerRow";
import FajrIcon from "./Icons/Fajr";
import DhuhrIcon from "./Icons/Dhuhr";
import AsrIcon from "./Icons/Asr";
import MaghribIcon from "./Icons/Maghrib";
import IshaIcon from "./Icons/Isha";

const prayers: { name: Prayer; icon: ReactNode }[] = [
  {
    name: Prayer.fajr,
    icon: <FajrIcon />,
  },
  {
    name: Prayer.dhuhr,
    icon: <DhuhrIcon />,
  },
  {
    name: Prayer.asr,
    icon: <AsrIcon />,
  },
  {
    name: Prayer.maghrib,
    icon: <MaghribIcon />,
  },
  {
    name: Prayer.isha,
    icon: <IshaIcon />,
  },
];

interface PrayersTable {
  columns: { [index: string]: ReactNode };
}

function PrayersTable({ columns }: PrayersTable) {
  columns;
  const rowsJSX = prayers.map(({ name, icon }) => {
    return (
      <PrayerRow key={name} prayerName={name} icon={icon}>
        {columns[name]}
      </PrayerRow>
    );
  });

  return (
    <table className="prayers-table">
      <tbody>{rowsJSX}</tbody>
    </table>
  );
}

export default PrayersTable;
