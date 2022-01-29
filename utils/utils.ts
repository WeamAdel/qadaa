import Language from "../types/Language";

export function formatHejriDate(timestamp: number, locale: string | Language): string {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString(`${locale}-u-ca-islamic`, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

export enum DateComparer {
  equals = 0,
  greater = 1,
  less = -1,
}

export function dateComparer(date1: string, date2: string): DateComparer | undefined {
  const timestamp1 = getTimeStamp(date1);
  const timestamp2 = getTimeStamp(date2);

  if (timestamp1 && timestamp2) {
    if (timestamp1 > timestamp2) return 1;

    if (timestamp1 < timestamp2) return -1;

    return DateComparer.equals;
  }
}

function getTimeStamp(date: string): number | undefined {
  try {
    return Date.parse(date) / 1000;
  } catch (e) {
    console.log(e);
    console.log("Invalid date " + date);
  }
}
