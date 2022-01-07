import NavItems from "../../components/Layout/Navbar/NavItems/NavItems";
import Logo from "../../components/Layout/Navbar/Logo";
import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";
import { redirectsToPage } from "../utils/utils";
import Language from "../../types/Language";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

afterEach(() => {
  mockRouter.setCurrentUrl("/");
});

describe("Navbar links redirects to correct pages with default english locale", () => {
  it("Redirects to about page", () => {
    const { match } = redirectsToPage(NavItems, "/about", "nav-about");
    expect(singletonRouter).toMatchObject({ asPath: match });
  });

  it("Redirects to donate page", () => {
    const { match } = redirectsToPage(NavItems, "/donate", "nav-donate");
    expect(singletonRouter).toMatchObject({ asPath: match });
  });

  it("Logo redirects to home page", () => {
    mockRouter.setCurrentUrl("/about");

    const { match } = redirectsToPage(Logo, "/", "nav-logo");
    expect(singletonRouter).toMatchObject({ asPath: match });
  });
});

describe("Routing with locale change", () => {
  it("Language button switches between en/ar locales", () => {
    const { getByTestId } = render(<NavItems />);

    fireEvent.click(getByTestId("nav-lang"));
    expect(singletonRouter).toMatchObject({ locale: Language.ar });

    fireEvent.click(getByTestId("nav-lang"));
    expect(singletonRouter).toMatchObject({ locale: Language.en });
  });
});
