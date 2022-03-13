import { render, fireEvent } from "@testing-library/react";
import Language from "../../types/Language";
import Prayer from "../../types/Prayer";

/**
 * Redirects to the passed url with the passed local.
 *
 * @param Component React component
 * @param url: Page url without the locale.
 * @param testid: data-testid value used on the link to be clicked.
 * @param locale?: The locale to be used, or it defaults to 'en'.
 *
 * @return {{rtlOptions: Object, match: string}}
 * - rtlOptions: The result of render(jsx).
 * - match: The final url after adding the local to it.
 */
export function redirectsToPage(Component, url, testid, locale = Language.en) {
  const { getByTestId, ...rest } = render(<Component />);
  const localeUrl = locale === Language.en ? "" : "/" + locale;

  fireEvent.click(getByTestId(testid));
  return { rtlOptions: { getByTestId, ...rest }, match: url + localeUrl };
}

/**
 * Adds asssertiong to check download modal components.
 * @param {(string)=>HTMLElement} getByTestId React testing library getByTestId
 */
export function addDownloadScheduleAssertions(getByTestId) {
  expect(getByTestId("download-schedule")).toBeInTheDocument();
  expect(getByTestId("download-schedule-desc").textContent.length).not.toBe(0);
  expect(getByTestId("download-schedule-btn")).toBeInTheDocument();
}

/**
 * Adds assertions to check the generated schedule table validity.
 * @param {HTMLTableElement} table The table to test.
 * @param {string} expectedTitle Expected table title.
 * @param {number} prayerIndex Random prayer index which represents one row in a table body (**starting from 1**).
 * @param {number} expectedPrayerCount The expected count corresponding to the passed prayer index.
 * @param {Prayer} expectedPrayerName The expected prayer name corres to the passed prayer index.
 */
export function addScheduleTableAssertions(
  table,
  expectedTitle,
  prayerIndex,
  expectedPrayerCount,
  expectedPrayerName
) {
  const head = table.querySelector("thead");
  const body = table.querySelector("tbody");

  // Head
  expect(head.childElementCount).toBe(2);
  // Title
  expect(head.children[0].children[0]).toHaveTextContent(expectedTitle);
  // Heading
  expect(head.children[1].children[0]).toHaveTextContent("N");
  expect(head.children[1].children[1]).toHaveTextContent("Prayer");
  expect(head.children[1].children[2]).toHaveTextContent("Done");

  //Body
  // Count
  expect(body.children[prayerIndex - 1].children[0]).toHaveTextContent(expectedPrayerCount);
  // Name
  expect(body.children[prayerIndex - 1].children[1]).toHaveTextContent(expectedPrayerName);
}
