import { ReactNode, useEffect, useState } from "react";
import { ScheduleYearData, YearsCountSchedule } from "../../../models/Schedule";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Table from "../PDFTable/Table";
import GenerateModal from "../GenerateModal/GenerateModal";

interface Schedule {
  years: number;
  resetForm: () => void;
}

function Schedule({ years, resetForm }: Schedule) {
  const [doc, setDoc]: [any, any] = useState(null);
  const [tables, setTables]: [Array<ReactNode> | null, any] = useState(null);
  const [data, setData]: [Array<ScheduleYearData> | null, any] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (!doc) {
      const jsPDFDoc = new jsPDF();
      setDoc(jsPDFDoc);
    }
  }, [doc]);

  useEffect(() => {
    // Cancel updating the state after the comonent unmounts
    let cancel = false;

    if (years && !data) {
      setTimeout(() => {
        generateScheduleData();
      }, 1500);
    }

    function generateScheduleData() {
      if (!cancel) {
        setData(new YearsCountSchedule(years).generateData());
      }
    }
    return () => {
      cancel = true;
    };
  }, [years, data]);

  useEffect(() => {
    if (!tables && data) {
      setTables(createTables());
    }

    function createTables(): Array<ReactNode> | undefined {
      if (data) {
        const tablesJSX = [];

        for (let year of data) {
          for (let day of year.prayers) {
            const id = `y-${year.count}-d-${day.count}`;
            tablesJSX.push(<Table key={id} id={id} prayers={day.prayers} title={day.title} />);
          }
        }

        return tablesJSX;
      }
    }
  }, [doc, data, tables]);

  useEffect(() => {
    if (tables && doc && data) {
      //@ts-ignore
      for (let year of data) {
        for (let day of year.prayers) {
          const id = `y-${year.count}-d-${day.count}`;
          addDayTable(id);
        }
      }

      setIsGenerated(true);
    }

    function addDayTable(tableId: string) {
      doc.autoTable({
        html: "#" + tableId,
        useCss: true,
        theme: "grid",
        pageBreak: "avoid",
      });
    }
  }, [tables, data, doc]);

  function resetSchedule() {
    setDoc(null);
    setTables(null);
    setData(null);
    setIsGenerated(false);
    resetForm();
  }

  async function download() {
    if (doc) {
      doc.save("qadaa-schedule.pdf");
    }
  }

  return (
    <div data-testid="by-years-schedule-tables">
      {tables ? tables : null}
      <GenerateModal isGenerated={isGenerated} download={download} resetSchedule={resetSchedule} />
    </div>
  );
}

export default Schedule;
