import { render, fireEvent } from "@testing-library/react";
import Tabs from "../../components/GenerateSchedule/Tabs";
import { Tab } from "../../types/Tabs";

describe("Form tabs navigate between tabs", () => {
  it("Should navigate to by years tab", () => {
    const { container, getByTestId } = render(<Tabs initTab={Tab.byCount} />);

    fireEvent.click(getTabBtn(container, Tab.byYears));

    expect(getByTestId("tab-" + Tab.byYears)).toHaveAttribute("data-selected", "true");
  });

  it("Should navigate to by time range tab", () => {
    const { container, getByTestId } = render(<Tabs />);

    fireEvent.click(getTabBtn(container, Tab.byTimeRange));

    expect(getByTestId("tab-" + Tab.byTimeRange)).toHaveAttribute("data-selected", "true");
  });

  it("Should navigate to by prayers count tab", () => {
    const { container, getByTestId } = render(<Tabs />);

    fireEvent.click(getTabBtn(container, Tab.byCount));

    expect(getByTestId("tab-" + Tab.byCount)).toHaveAttribute("data-selected", "true");
  });
});

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
