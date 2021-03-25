import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

let container: any = null;

const data = {
  inventory: {
    bread: 40,
    lettuce: 20,
    tomato: 20,
    cheese: 10,
    bacon: 10,
    turkey: 5
  },
  menu: [
    {
      name: "Vegetarian",
      price: 8.99,
      ingredients: {
        bread: 2,
        lettuce: 2,
        tomato: 2,
        cheese: 2
      }
    },
    {
      name: "BLT",
      price: 9.99,
      ingredients: {
        bread: 3,
        lettuce: 1,
        tomato: 1,
        bacon: 2
      }
    },
    {
      name: "Turkey",
      price: 10.99,
      ingredients: {
        bread: 2,
        lettuce: 1,
        tomato: 1,
        cheese: 1,
        turkey: 1
      }
    }
  ]
};

describe("Test main application", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders without crashing", () => {
    act(() => {
      render(<App />, container);
    });

    expect(container.querySelector(".app")).toBeTruthy();
  });

  it("renders with initial data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data)
      })
    );

    act(() => {
      render(<App />, container);
    });

    expect(container.querySelector(".loading-container")).toBeTruthy();

    await new Promise((resolve) => setTimeout(resolve, 1500));

    expect(container.querySelector(".loading-container")).toBeFalsy();
    expect(container.textContent).toContain("Client view");

    global.fetch.mockRestore();
  });
});
