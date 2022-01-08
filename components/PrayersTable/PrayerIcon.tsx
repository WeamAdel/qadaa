import Image from "next/image";
import Prayer from "../../types/Prayer";
import PrayerColumn from "./PrayerColumn";

function PrayerIcon({ name, alt }: { name: Prayer; alt: string }) {
  return (
    <PrayerColumn classes={`prayers-table__${name}-icon`} type="icon">
      <Image
        role="presentation"
        width="18px"
        height="18px"
        src={`/images/prayers/${name}.svg`}
        alt={alt}
      />
    </PrayerColumn>
  );
}

export default PrayerIcon;
