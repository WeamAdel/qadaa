import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import Language from "../../../types/Language";

function TableHead({ title }: { title?: string }) {
  const { prayer, number, done } = useContext(LangContext);
  const { locale } = useRouter();
  const tableHeadJSX: ReactNode = [
    <td key="table-head-number">{number}</td>,
    <td key="table-head-prayer">{prayer}</td>,
    <td key="table-head-done">{done}</td>,
  ];

  if (locale === Language.ar) {
    //@ts-ignore
    tableHeadJSX.reverse();
  }

  return (
    <thead>
      {title ? (
        <tr style={{ backgroundColor: "white", color: "black" }}>
          <td style={{ textAlign: "left", border: "none", marginBottom: "2px" }}>{title}</td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
        </tr>
      ) : null}
      <tr style={{ backgroundColor: "black", color: "white" }}>{tableHeadJSX}</tr>
    </thead>
  );
}

export default TableHead;
