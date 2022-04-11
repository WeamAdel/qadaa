import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SchedulePrayerData } from "../../../models/Schedule";
import Language from "../../../types/Language";

export interface TableBody {
  rows: Array<SchedulePrayerData>;
}

function TableBody({ rows }: TableBody) {
  const { locale } = useRouter();

  const rowsJSX = rows.map((row) => {
    const tableBodyJSX: ReactNode = [
      <th
        key={"sc-body-cell-count-" + row.count}
        style={{ backgroundColor: "white", color: "black" }}
      >
        {row.count}
      </th>,
      <td
        key={"sc-body-cell-prayer-" + row.count}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        {row.prayer}
      </td>,
      <td
        key={"sc-body-cell-done-" + row.count}
        style={{ backgroundColor: "white", color: "black", width: "30px" }}
      ></td>,
    ];

    if (locale === Language.ar) {
      //@ts-ignore
      tableBodyJSX.reverse();
    }

    return <tr key={`prayer-cell-${row.count}`}>{tableBodyJSX}</tr>;
  });

  return <tbody>{rowsJSX}</tbody>;
}

export default TableBody;
