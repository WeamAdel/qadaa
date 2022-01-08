import Language from "../../types/Language";

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
