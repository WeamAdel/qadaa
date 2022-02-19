import { render, fireEvent, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";
import { Tab } from "../../../types/Tabs";

import Tabs from "../../../components/GenerateSchedule/Tabs";
import Route from "../../../settings/routes";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

afterEach(() => {
  mockRouter.setCurrentUrl("/");
  window.location.hash = "";
});

describe("Navigate between tabs", () => {
  it("Should navigate to by years tab", () => {
    const { container, getByTestId } = render(<Tabs initTab={Tab.Count} />);

    fireEvent.click(getTabBtn(container, Tab.Years));

    expect(getByTestId("tab-" + Tab.Years)).toHaveAttribute("data-selected", "true");
  });

  it("Should navigate to by time range tab", () => {
    const { container, getByTestId } = render(<Tabs />);

    fireEvent.click(getTabBtn(container, Tab.TimeRange));

    expect(getByTestId("tab-" + Tab.TimeRange)).toHaveAttribute("data-selected", "true");
  });

  it("Should navigate to by prayers count tab", () => {
    const { container, getByTestId } = render(<Tabs />);

    fireEvent.click(getTabBtn(container, Tab.Count));

    expect(getByTestId("tab-" + Tab.Count)).toHaveAttribute("data-selected", "true");
  });
});

describe("Navigate using url hash", () => {
  it("Should render by time range tab from hash", async () => {
    redirectToTabHash(Tab.TimeRange);

    const { getByTestId } = render(<Tabs />);

    await waitFor(() => {
      expect(getByTestId("tab-" + Tab.TimeRange)).toHaveAttribute("data-selected", "true");
    });
  });
});

/**
 * Redirects to the generate schedule page with a tab hash value.
 *
 * @param {string} hash The hash value without the #
 */
function redirectToTabHash(hash) {
  mockRouter.setCurrentUrl(`${Route.generate}/#${hash}`);
  window.location.hash = "#" + hash;
}

/**
 * Gets the tab button by its itemID value.
 *
 * @param {HTMLElement} container
 * @param {Tab} tabType
 * @returns {HTMLElement}
 */
function getTabBtn(container, tabType) {
  return container.querySelector(`[itemID='tab-btn-${tabType}']`);
}
