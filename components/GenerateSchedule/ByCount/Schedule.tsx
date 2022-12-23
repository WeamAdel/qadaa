import { ReactNode, useContext, useEffect, useState } from "react";
import { PrayersCountSchedule, SchedulePrayerData } from "../../../models/Schedule";
import { PrayersCount } from "../../../types/Schedule";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Table from "../PDFTable/Table";
import GenerateModal from "../GenerateModal/GenerateModal";
import Language from "../../../types/Language";
import AUTOTABLE_CONFIGS from "../autotable-configs";
import { LangContext } from "../../../Providers/Language";
import useMyRouter from "../../../hooks/useMyRouter";

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
  const { prayers } = useContext(LangContext);
  const { locale } = useMyRouter();

  useEffect(() => {
    if (!doc) {
      const jsPDFDoc = new jsPDF();
      setDoc(jsPDFDoc);
    }
  }, [doc]);

  useEffect(() => {
    // Cancel updating the state after the comonent unmounts
    let cancel = false;

    if (prayersCount && !data) {
      setTimeout(() => {
        generateScheduleData();
      }, 1500);
    }

    function generateScheduleData() {
      if (!cancel) {
        setData(new PrayersCountSchedule(prayersCount, locale as Language).generateData());
      }
    }

    return () => {
      cancel = true;
    };
  }, [prayersCount, data, locale]);

  useEffect(() => {
    //@ts-ignore
    if (!tables && data && data) {
      setTables(createTables());
    }

    function createTables(): ReactNode | undefined {
      if (data) {
        return <Table key={scheduleId} id={scheduleId} prayers={data} title={prayers} />;
      }
    }
  }, [doc, data, tables, prayers]);

  useEffect(() => {
    if (tables && doc && data) {
      addDayTable(scheduleId);
      setIsGenerated(true);
    }

    function addDayTable(tableId: string) {
      doc.autoTable({
        html: "#" + tableId,
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
    <div data-testid="by-prayers-count-schedule-tables">
      {tables ? tables : null}
      <GenerateModal isGenerated={isGenerated} download={download} resetSchedule={resetSchedule} />
    </div>
  );
}

export default Schedule;
