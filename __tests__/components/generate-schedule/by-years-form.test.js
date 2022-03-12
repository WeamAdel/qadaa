import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import Form, {
  minYearLimit,
  maxYearLimit,
} from "../../../components/GenerateSchedule/ByYears/Form";
import ByYears from "../../../components/GenerateSchedule/ByYears/ByYears";
import { addScheduleTableAssertions } from "../../utils/utils";
import Prayer from "../../../types/Prayer";

describe("Create schedule by years count", () => {
  it("Form is accessible", async () => {
    const { container } = render(<Form />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("Should show error message on empty years count", async () => {
    const { getByText, getByTestId } = render(<Form />);

    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/required/i)).toBeInTheDocument();
    });
  });

  it("Should show error message on years count greater than the maximum year limit", async () => {
    const { getByText, getByTestId } = render(<Form />);

    userEvent.type(getByTestId("years-count"), (maxYearLimit + 1).toString());
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/more than/im)).toBeInTheDocument();
    });
  });

  it("Should hide error message on valid number added", async () => {
    const { getByText, queryByText, getByTestId } = render(<Form />);

    userEvent.type(getByTestId("years-count"), (minYearLimit - 1).toString());
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/less than/im)).toBeInTheDocument();
    });

    userEvent.type(getByTestId("years-count"), (minYearLimit + 1).toString());
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(queryByText(/less than/im)).toBeNull();
    });
  });

  it("Should show loading on form submit", async () => {
    const { getByTestId } = render(<ByYears />);

    userEvent.type(getByTestId("years-count"), "1");
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByTestId("schedule-loading")).toBeInTheDocument();
    });
  });

  it("Should generate schedule with download button", async () => {
    const { getByTestId } = render(<ByYears />);

    userEvent.type(getByTestId("years-count"), "1");
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(
      () => {
        // Download modal
        expect(getByTestId("download-schedule")).toBeInTheDocument();
        expect(getByTestId("download-schedule-desc").textContent.length).not.toBe(0);
        expect(getByTestId("download-schedule-btn")).toBeInTheDocument();

        // Created schedule
        const tablesWrapper = getByTestId("by-years-schedule-tables");

        expect(tablesWrapper).toBeInTheDocument();

        //365 days as we created the schedule for one year.
        expect(tablesWrapper.childElementCount).toBe(365);

        //Testing a random day(last day of the year) and a random prayer(last prayer in the last day).
        addScheduleTableAssertions(tablesWrapper.children[364], "Day 365", 5, 1825, Prayer.isha);
      },
      { timeout: 1000 }
    );
  });
});
