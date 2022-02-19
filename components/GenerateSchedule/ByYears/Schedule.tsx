import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import { ScheduleYearData } from "../../../models/Schedule";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Table from "../PDFTable/Table";

interface Schedule {
  data: Array<ScheduleYearData>;
  updateGenerated: () => void;
  setSaveButton: (button: HTMLButtonElement) => void;
}

function Schedule({ data, updateGenerated, setSaveButton }: Schedule) {
  const [doc, setDoc]: [any, any] = useState();
  const [tables, setTables]: [Array<ReactNode> | null, any] = useState(null);
  const saveBtnRef = useRef() as MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    if (!doc) {
      const jsPDFDoc = new jsPDF();
      setDoc(jsPDFDoc);
    }
  }, [doc]);

  useEffect(() => {
    if (!tables) {
      setTables(createTables());
    }

    function createTables(): Array<ReactNode> {
      const tablesJSX = [];

      for (let year of data) {
        for (let day of year.prayers) {
          const id = `y-${year.count}-d-${day.count}`;
          tablesJSX.push(<Table key={id} id={id} prayers={day.prayers} title={day.title} />);
        }
      }

      return tablesJSX;
    }
  }, [doc, data, tables]);

  useEffect(() => {
    if (tables && doc) {
      for (let year of data) {
        for (let day of year.prayers) {
          const id = `y-${year.count}-d-${day.count}`;
          addDayTable(id);
        }
      }

      updateGenerated();
    }

    function addDayTable(tableId: string) {
      doc.autoTable({
        html: "#" + tableId,
        useCss: true,
        theme: "grid",
      });
    }
  }, [tables, data, doc, updateGenerated]);

  useEffect(() => {
    if (saveBtnRef.current) {
      setSaveButton(saveBtnRef.current);
    }
  }, [saveBtnRef.current]);

  async function save() {
    if (doc) {
      doc.save("table.pdf");
    }
  }

  return (
    <div>
      {tables ? tables : <></>}
      <button onClick={save} ref={saveBtnRef}>
        Save
      </button>
    </div>
  );
}

export default Schedule;
