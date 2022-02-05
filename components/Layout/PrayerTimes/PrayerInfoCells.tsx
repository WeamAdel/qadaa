import PrayerCell from "../../PrayersTable/PrayerCell";

function PrayerInfoCells({ name, time }: { name: string; time: string }) {
  return (
    <>
      <PrayerCell>{time}</PrayerCell>
    </>
  );
}

export default PrayerInfoCells;
