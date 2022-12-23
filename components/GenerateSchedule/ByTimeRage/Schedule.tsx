import { ReactNode, useEffect, useState } from "react";
import { ScheduleDayData, TimeRangeSchedule } from "../../../models/Schedule";
import { DateRange } from "../../../types/Schedule";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Table from "../PDFTable/Table";
import GenerateModal from "../GenerateModal/GenerateModal";
import AUTOTABLE_CONFIGS from "../autotable-configs";
import { useRouter } from "next/router";
import Language from "../../../types/Language";

interface Schedule {
  dateRange: DateRange;
  resetForm: () => void;
}

function Schedule({ dateRange, resetForm }: Schedule) {
  const [doc, setDoc]: [any, any] = useState(null);
  const [tables, setTables]: [Array<ReactNode> | null, any] = useState(null);
  const [data, setData]: [Array<ScheduleDayData> | null, any] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const { locale } = useRouter();

  useEffect(() => {
    if (!doc) {
      const jsPDFDoc = new jsPDF();
      setDoc(jsPDFDoc);
    }
  }, [doc]);

  useEffect(() => {
    // Cancel updating the state after the comonent unmounts
    let cancel = false;

    if (dateRange && !data) {
      setTimeout(() => {
        generateScheduleData();
      }, 1500);
    }

    function generateScheduleData() {
      if (!cancel) {
        setData(new TimeRangeSchedule(dateRange, locale as Language).generateData());
      }
    }

    return () => {
      cancel = true;
    };
  }, [dateRange, data, locale]);

  useEffect(() => {
    if (!tables && data) {
      setTables(createTables());
    }

    function createTables(): Array<ReactNode> | undefined {
      if (data) {
        const tablesJSX = [];

        for (let day of data) {
          const id = `d-${day.count}`;
          tablesJSX.push(<Table key={id} id={id} prayers={day.prayers} title={day.title} />);
        }

        return tablesJSX;
      }
    }
  }, [doc, data, tables]);

  useEffect(() => {
    if (tables && doc && data) {
      //@ts-ignore
      for (let day of data) {
        const id = `d-${day.count}`;
        addDayTable(id);
      }

      setIsGenerated(true);
    }

    function addDayTable(tableId: string) {
      doc.autoTable({
        html: "#" + tableId,
        pageBreak: "avoid",
        ...AUTOTABLE_CONFIGS,
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
    <div data-testid="by-time-range-schedule-tables">
      {tables ? tables : null}
      <GenerateModal isGenerated={isGenerated} download={download} resetSchedule={resetSchedule} />
    </div>
  );
}

export default Schedule;
