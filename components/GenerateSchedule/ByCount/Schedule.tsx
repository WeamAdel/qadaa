import { ReactNode, useEffect, useState } from "react";
import { PrayersCountSchedule, SchedulePrayerData } from "../../../models/Schedule";
import { PrayersCount } from "../../../types/Schedule";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Table from "../PDFTable/Table";
import GenerateModal from "../GenerateModal/GenerateModal";

interface Schedule {
  prayersCount: PrayersCount;
  resetForm: () => void;
}

const scheduleId = "prayers-count-schedule";

function Schedule({ prayersCount, resetForm }: Schedule) {
  const [doc, setDoc]: [any, any] = useState(null);
  const [tables, setTables]: [Array<ReactNode> | null, any] = useState(null);
  const [data, setData]: [Array<SchedulePrayerData> | null, any] = useState(null);
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

  useEffect(() => {
    //@ts-ignore
    if (!tables && data && data) {
      setTables(createTables());
    }

    function createTables(): ReactNode | undefined {
      if (data) {
        return <Table key={scheduleId} id={scheduleId} prayers={data} title={"Prayers"} />;
      }
    }
  }, [doc, data, tables]);

  useEffect(() => {
    if (tables && doc && data) {
      addDayTable(scheduleId);
      setIsGenerated(true);
    }

    function addDayTable(tableId: string) {
      doc.autoTable({
        html: "#" + tableId,
        useCss: true,
        theme: "grid",
        // pageBreak: "avoid",
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
    <div data-testid="by-prayers-count-schedule-tables">
      {tables ? tables : null}
      <GenerateModal isGenerated={isGenerated} download={download} resetSchedule={resetSchedule} />
    </div>
  );
}

export default Schedule;
