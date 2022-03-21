import { SchedulePrayerData } from "../../../models/Schedule";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

interface Table {
  id: string;
  prayers: Array<SchedulePrayerData>;
  title?: string;
}

function Table({ id, prayers, title }: Table) {
  return (
    <table
      id={id}
      className="schedule__table"
      aria-hidden="true"
      style={{ textAlign: "center", textTransform: "capitalize", fontFamily: "sans-serif" }}
    >
      <TableHead title={title} />
      <TableBody rows={prayers} />
    </table>
  );
}

export default Table;
