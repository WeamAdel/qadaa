import Prayer from "../../../types/Prayer";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

interface Table {
  id: string;
}

function Table({ id }: Table) {
  return (
    <table id={id} className="schedule__table" aria-hidden="true" style={{ textAlign: "center" }}>
      <TableHead />
      <TableBody
        rows={[
          { count: 1, prayer: Prayer.fajr },
          { count: 2, prayer: Prayer.dhuhr },
        ]}
      />
    </table>
  );
}

export default Table;
