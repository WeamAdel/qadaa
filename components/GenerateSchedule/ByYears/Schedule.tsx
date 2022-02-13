import { ReactNode, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Table from "../PDFTable/Table";
import { ScheduleYearData } from "../../../models/Schedule";
import { appendDoneIcon, appendPrayerIcon } from "../PDFTable/js-pdf-utils";

interface Schedule {
  data: Array<ScheduleYearData>;
}

function Schedule({ data }: Schedule) {
  const [doc, setDoc]: [any, any] = useState();
  const [tables, setTables]: [Array<ReactNode> | null, any] = useState(null);

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
    }

    function addDayTable(tableId: string) {
      doc.autoTable({
        html: "#" + tableId,
        useCss: true,
        theme: "grid",
        // didDrawCell: cellDrawn,
      });
    }

    function cellDrawn(data: any) {
      addDoneImage(data);
      addPrayerImage(data);
    }

    function addDoneImage(data: any) {
      if (data.row.section === "body" && data.cell.raw.dataset.done === "true") {
        // console.log(data);
        appendDoneIcon(doc, data);
      }
    }

    function addPrayerImage(data: any) {
      if (data.row.section === "body" && data.cell.raw.dataset.prayerIcon === "true") {
        // console.log(data);
        appendPrayerIcon(doc, data, data.cell.raw.dataset.prayer);
      }
    }
  }, [tables, data, doc]);

  async function save() {
    if (doc) {
      doc.save("table.pdf");
    }
  }

  return (
    <div>
      {tables ? tables : <></>}
      <button onClick={save}>Save</button>
    </div>
  );
}

export default Schedule;
