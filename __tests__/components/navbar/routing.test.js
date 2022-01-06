import NavItems from "../../../components/Layout/Navbar/NavItems/NavItems";
import Logo from "../../../components/Layout/Navbar/Logo";
import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

afterEach(() => {
  mockRouter.setCurrentUrl("/");
});

describe("Navbar links redirects to correct pages", () => {
  it("Redirects to about page", async () => {
    const { getByTestId } = render(<NavItems />);
    fireEvent.click(getByTestId("nav-about"));
    expect(singletonRouter).toMatchObject({ asPath: "/about" });
  });

  it("Redirects to donate page", async () => {
    const { getByTestId } = render(<NavItems />);
    fireEvent.click(getByTestId("nav-donate"));
    expect(singletonRouter).toMatchObject({ asPath: "/donate" });
  });
});

it("Logo redirects to home page", () => {
  const { getByTestId } = render(<Logo />);

  mockRouter.setCurrentUrl("/about");

  fireEvent.click(getByTestId("nav-logo"));
  expect(singletonRouter).toMatchObject({ asPath: "/" });
});
