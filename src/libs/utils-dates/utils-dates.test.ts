import { getSelectedDay } from "./";

describe("getSelectedDay", () => {
  it("when the format is not provided", () => {
    const date = getSelectedDay(10);
    expect(date).toBe("Monday, 10 October");
  });
  it("when the format is provided", () => {
    const date = getSelectedDay(10, "MM-DD-YYYY");
    expect(date).toBe("10-10-2022");
  });
});
