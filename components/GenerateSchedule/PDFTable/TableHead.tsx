import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import Language from "../../../types/Language";
import { v4 as uuidv4 } from "uuid";

function TableHead({ title }: { title?: string }) {
  const { prayer, number, done } = useContext(LangContext);
  const { locale } = useRouter();

  const tableHeadJSX: ReactNode = [
    <td key="table-head-number">{number}</td>,
    <td key="table-head-prayer">{prayer}</td>,
    <td key="table-head-done">{done}</td>,
  ];
  const titleJSX: ReactNode = [
    <td
      key={uuidv4()}
      style={{
        border: "none",
        marginBottom: "2px",
        textAlign: locale === Language.ar ? "right" : "left",
      }}
    >
      {title}
    </td>,
    <td key={uuidv4()} style={{ border: "none" }}></td>,
    <td key={uuidv4()} style={{ border: "none" }}></td>,
  ];

  if (locale === Language.ar) {
    //@ts-ignore
    tableHeadJSX.reverse();

    //@ts-ignore
    titleJSX.reverse();
  }

  return (
    <thead>
      {title ? (
        <tr
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          {titleJSX}
        </tr>
      ) : null}
      <tr style={{ backgroundColor: "black", color: "white" }}>{tableHeadJSX}</tr>
    </thead>
  );
}

export default TableHead;
