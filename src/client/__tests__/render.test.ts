import { render } from "react-dom";
import { renderApp } from "../render";

let isRendered = false;

jest.mock("react-dom");
(render as jest.Mock).mockImplementation(() => {
  isRendered = true;
});

test("render app", () => {
  renderApp();

  expect(isRendered).toBe(true);
});
