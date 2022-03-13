import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { addDownloadScheduleAssertions, addScheduleTableAssertions } from "../../utils/utils";

import ByTimeRange from "../../../components/GenerateSchedule/ByTimeRage/ByTimeRange";
import Form from "../../../components/GenerateSchedule/ByTimeRage/Form";
import Prayer from "../../../types/Prayer";

const generateSchedule = jest.fn();

describe("Create schedule by time range", () => {
  it("Form is accessible", async () => {
    const { container } = render(<Form generateSchedule={generateSchedule} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("Should show error message on empty dates", async () => {
    const { getByText, getByTestId } = render(<Form generateSchedule={generateSchedule} />);

    // Show
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/start date is required/i)).toBeInTheDocument();
      expect(getByText(/end date is required/i)).toBeInTheDocument();
    });
  });

  it("Should show error message on end date less than start date", async () => {
    const { getByText, getByTestId } = render(<Form generateSchedule={generateSchedule} />);

    userEvent.type(getByTestId("range-start"), "2022-01-02");
    userEvent.type(getByTestId("range-end"), "2022-01-01");

    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/enter date greater than start date/im)).toBeInTheDocument();
    });
  });

  it("Should hide error message on valid dates added", async () => {
    const { queryByRole, getByTestId } = render(<Form generateSchedule={generateSchedule} />);

    // Show required errors
    fireEvent.click(getByTestId("generate-form-submit"));

    //Show invalid date error
    userEvent.type(getByTestId("range-start"), "2022-01-02");
    userEvent.type(getByTestId("range-end"), "2022-01-01");
    fireEvent.click(getByTestId("generate-form-submit"));

    //Enter valid value and hide error messages
    userEvent.type(getByTestId("range-end"), "2022-01-03");
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(queryByRole("alert")).toBeNull();
    });
  });

  it("Should show loading on form submit", async () => {
    const { getByTestId } = render(<ByTimeRange />);

    userEvent.type(getByTestId("range-start"), "2022-01-01");
    userEvent.type(getByTestId("range-end"), "2022-01-10");
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByTestId("schedule-loading")).toBeInTheDocument();
    });
  });

  it("Should generate schedule with download button", async () => {
    const { getByTestId } = render(<ByTimeRange />);

    userEvent.type(getByTestId("range-start"), "2022-01-01");
    userEvent.type(getByTestId("range-end"), "2022-01-10");
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(
      () => {
        // Download modal
        addDownloadScheduleAssertions(getByTestId);

        // Created schedule
        const tablesWrapper = getByTestId("by-time-range-schedule-tables");

        expect(tablesWrapper).toBeInTheDocument();

        //10 days time range.
        expect(tablesWrapper.childElementCount).toBe(10);

        //Testing a random day(10th day) and a random prayer(last prayer in the 10th day).
        addScheduleTableAssertions(tablesWrapper.children[9], "Day 10", 5, 50, Prayer.isha);
      },
      { timeout: 3000 }
    );
  });
});
