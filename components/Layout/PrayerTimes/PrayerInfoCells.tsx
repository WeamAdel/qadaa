import PrayerCell from "../../PrayersTable/PrayerCell";

function PrayerInfoCells({ time }: { time: string }) {
  return (
    <>
      <PrayerCell>{time}</PrayerCell>
    </>
  );
}

export default PrayerInfoCells;
