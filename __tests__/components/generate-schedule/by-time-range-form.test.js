import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import Form from "../../../components/GenerateSchedule/ByTimeRage/Form";

describe("Create schedule by time range", () => {
  it("Form is accessible", async () => {
    const { container } = render(<Form />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("Should show error message on empty dates", async () => {
    const { getByText, getByTestId } = render(<Form />);

    // Show
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/start date is required/i)).toBeInTheDocument();
      expect(getByText(/end date is required/i)).toBeInTheDocument();
    });
  });

  it("Should show error message on end date less than start date", async () => {
    const { getByText, getByTestId } = render(<Form />);

    userEvent.type(getByTestId("range-start"), "2022-01-02");
    userEvent.type(getByTestId("range-end"), "2022-01-01");

    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/enter date greater than start date/im)).toBeInTheDocument();
    });
  });

  it("Should hide error message on valid dates added", async () => {
    const { queryByRole, getByTestId } = render(<Form />);

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
});
