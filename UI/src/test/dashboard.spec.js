// please add your test cases here
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { act } from "react-dom/test-utils";
import  Dashboard  from "../components/Dashboard";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render Card", () => {
  act(() => {
    render(<Dashboard></Dashboard>, container);
  });
  expect(container.querySelector("div")).not.toBeNull();
});

export default Dashboard;
