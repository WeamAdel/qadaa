import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import Form, {
  minYearLimit,
  maxYearLimit,
} from "../../../components/GenerateSchedule/ByYears/Form";

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
});
