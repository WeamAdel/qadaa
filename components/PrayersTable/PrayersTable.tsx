import { ReactNode } from "react";
import Prayer from "../../types/Prayer";
import PrayerRow from "./PrayerRow";

const prayers: { name: Prayer; alt: string }[] = [
  {
    name: Prayer.fajr,
    alt: "Sunrise",
  },
  {
    name: Prayer.dhuhr,
    alt: "Sunny",
  },
  {
    name: Prayer.asr,
    alt: "Mostly sunny",
  },
  {
    name: Prayer.maghrib,
    alt: "Sunset",
  },
  {
    name: Prayer.isha,
    alt: "Moon",
  },
];

interface PrayersTable {
  columns: { [index: string]: ReactNode };
}

function PrayersTable({ columns }: PrayersTable) {
  columns;
  const rowsJSX = prayers.map(({ name, alt }) => {
    return (
      <PrayerRow key={name} prayerName={name} iconAlt={alt}>
        {columns[name]}
      </PrayerRow>
    );
  });

  return <table className="prayers-table">{rowsJSX}</table>;
}

export default PrayersTable;
