import { ScheduleRow } from "../../../types/Schedule";

export interface TableBody {
  rows: Array<ScheduleRow>;
}

function TableBody({ rows }: TableBody) {
  const rowsJSX = rows.map((row) => {
    <tr key={`prayer-cell-${row.count}`}>
      <th>{row.count}</th>
      <td data-icon="true">prayer image</td>
      <td>{row.prayer}</td>
      <td data-done="true">done image</td>
    </tr>;
  });

  return <tbody>{rowsJSX}</tbody>;
}

export default TableBody;
