import { render } from "@testing-library/react";

import { AddEventForm } from "./AddEventForm";

jest.mock("axios", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("../../stores/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

describe("AddEventForm", () => {
  it("Should renders correctly", () => {
    const { baseElement } = render(
      <AddEventForm day={10} openModal={() => {}} />
    );
    expect(baseElement).toBeTruthy();
  });
});
