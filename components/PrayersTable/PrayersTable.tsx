import { ReactNode } from "react";
import Prayer from "../../types/Prayer";
import PrayerRow from "./PrayerRow";
import FajrIcon from "../../public/images/prayers/fajr.svg";
import DhuhrIcon from "../../public/images/prayers/dhuhr.svg";
import AsrIcon from "../../public/images/prayers/asr.svg";
import MaghribIcon from "../../public/images/prayers/maghrib.svg";
import IshaIcon from "../../public/images/prayers/isha.svg";

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

  return <table className="prayers-table">{rowsJSX}</table>;
}

export default PrayersTable;
