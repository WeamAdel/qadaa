import { dateComparer } from "../utils/utils";

describe("Compare dates", () => {
  it("Should return 0 in equal dates", () => {
    expect(dateComparer("2022-01-22", "2022-01-22")).toBe(0);
  });

  it("Should return 1 in case date1 is greater than date2", () => {
    expect(dateComparer("2022-01-23", "2022-01-22")).toBe(1);
  });

  it("Should return -1 in case date1 is less than date2", () => {
    expect(dateComparer("2022-01-21", "2022-01-22")).toBe(-1);
  });

  it("Should return undefined in case dates are invalid", () => {
    expect(dateComparer("string", null)).toBe(undefined);
  });
});
