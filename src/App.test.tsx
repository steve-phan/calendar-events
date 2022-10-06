import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "jest-styled-components";

jest.mock("axios", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
test("renders learn react link", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeTruthy();
});
