import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import Form, { perPrayerMaxCount } from "../../../components/GenerateSchedule/ByCount/Form/Form";

describe("Create schedule by prayers count", () => {
  it("Form is accessible", async () => {
    const { container } = render(<Form />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("Should show error message on empty prayers count", async () => {
    const { getByText, getByTestId } = render(<Form />);

    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/at leats/i)).toBeInTheDocument();
    });
  });

  it("Should show error message if a prayer count exceeds the max limit", async () => {
    const { getByText, getByTestId } = render(<Form />);

    userEvent.type(getByTestId("prayer-fajr"), (perPrayerMaxCount + 1).toString());
    fireEvent.click(getByTestId("generate-form-submit"));

    await waitFor(() => {
      expect(getByText(/less than/i)).toBeInTheDocument();
    });
  });

  it("Should hide error message on valid prayers count", async () => {
    const { getByTestId, queryByTestId } = render(<Form />);

    fireEvent.click(getByTestId("generate-form-submit"));
    userEvent.type(getByTestId("prayer-fajr"), "5");

    await waitFor(() => {
      expect(queryByTestId(/at leats/i)).toBeNull();
    });

    userEvent.type(getByTestId("prayer-fajr"), (perPrayerMaxCount + 1).toString());
    userEvent.type(getByTestId("prayer-fajr"), perPrayerMaxCount.toString());

    await waitFor(() => {
      expect(queryByTestId(/less than/i)).toBeNull();
    });
  });
});
