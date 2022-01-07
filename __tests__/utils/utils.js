import { render, fireEvent } from "@testing-library/react";
import Language from "../../types/Language";

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
