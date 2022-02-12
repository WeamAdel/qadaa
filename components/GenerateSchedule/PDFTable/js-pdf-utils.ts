import Prayer from "../../../types/Prayer";
import * as base64Images from "./base64-images";

interface AppendImage {
  base64Image: string;
  doc: any;
  data: any;
  x?: number;
  y?: number;
  type?: string;
}

const PRAYER_BASE64_ICONS = {
  [Prayer.fajr]: base64Images.FAJR,
  [Prayer.dhuhr]: base64Images.DHUHR,
  [Prayer.asr]: base64Images.ASR,
  [Prayer.maghrib]: base64Images.MAGHRIB,
  [Prayer.isha]: base64Images.ISHA,
};

export function appendDoneIcon(doc: any, data: any) {
  appendImage({
    doc,
    data,
    base64Image: base64Images.DONE,
  });
}

export function appendPrayerIcon(doc: any, data: any, prayer: Prayer) {
  appendImage({
    doc,
    data,
    base64Image: PRAYER_BASE64_ICONS[prayer],
  });
}

export function appendImage({ base64Image, doc, data, x, y, type = "PNG" }: AppendImage) {
  doc.addImage(base64Image, type, x || data.cell.x + 20, y || data.cell.y, 5, 5);
}
