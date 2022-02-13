import { ScheduleRow } from "../../../types/Schedule";

export interface TableBody {
  rows: Array<ScheduleRow>;
}

function TableBody({ rows }: TableBody) {
  const rowsJSX = rows.map((row) => {
    return (
      <tr key={`prayer-cell-${row.count}`}>
        <th style={{ backgroundColor: "white", color: "black" }}>{row.count}</th>
        <td style={{ backgroundColor: "white", color: "black" }}>{row.prayer}</td>
        <td style={{ backgroundColor: "white", color: "black", width: "30px" }}></td>
      </tr>
    );
  });

  return <tbody>{rowsJSX}</tbody>;
}

export default TableBody;
