import { ReactNode, useEffect, useState } from "react";
import { PrayersCountSchedule, ScheduleDayData, TimeRangeSchedule } from "../../../models/Schedule";
import { PrayersCount } from "../../../types/Schedule";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Table from "../PDFTable/Table";
import GenerateModal from "../GenerateModal/GenerateModal";

interface Schedule {
  prayersCount: PrayersCount;
  resetForm: () => void;
}

function Schedule({ prayersCount, resetForm }: Schedule) {
  const [doc, setDoc]: [any, any] = useState(null);
  const [tables, setTables]: [Array<ReactNode> | null, any] = useState(null);
  const [data, setData]: [Array<ScheduleDayData> | null, any] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (!doc) {
      const jsPDFDoc = new jsPDF();
      setDoc(jsPDFDoc);
    }
  }, [doc]);

  useEffect(() => {
    if (prayersCount && !data) {
      setTimeout(() => {
        generateScheduleData();
      }, 1500);
    }

    function generateScheduleData() {
      setData(new PrayersCountSchedule(prayersCount).generateData());
    }
  }, [prayersCount, data]);

  // useEffect(() => {
  //   if (!tables && data) {
  //     setTables(createTables());
  //   }

  //   function createTables(): Array<ReactNode> | undefined {
  //     if (data) {
  //       const tablesJSX = [];

  //       for (let day of data) {
  //         const id = `d-${day.count}`;
  //         tablesJSX.push(<Table key={id} id={id} prayers={day.prayers} title={day.title} />);
  //       }

  //       return tablesJSX;
  //     }
  //   }
  // }, [doc, data, tables]);

  // useEffect(() => {
  //   if (tables && doc && data) {
  //     //@ts-ignore
  //     for (let day of data) {
  //       const id = `d-${day.count}`;
  //       addDayTable(id);
  //     }

  //     setIsGenerated(true);
  //   }

  //   function addDayTable(tableId: string) {
  //     doc.autoTable({
  //       html: "#" + tableId,
  //       useCss: true,
  //       theme: "grid",
  //       pageBreak: "avoid",
  //     });
  //   }
  // }, [tables, data, doc]);

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
    <div>
      {tables ? tables : null}
      <GenerateModal isGenerated={isGenerated} download={download} resetSchedule={resetSchedule} />
    </div>
  );
}

export default Schedule;
