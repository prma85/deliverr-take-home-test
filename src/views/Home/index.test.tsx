import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Home from "./index";

let container: any = null;

describe("Test Home view", () => {
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

  it("loads default page as client", () => {
    const toogleBtn = <button />;
    act(() => {
      render(<Home title="Client" toogleBtn={toogleBtn} />, container);
    });

    expect(container.textContent).toContain("Client view");

    act(() => {
      render(<Home title="Kitchen" toogleBtn={toogleBtn} />, container);
    });

    expect(container.textContent).toContain("Kitchen view");
  });

  it("clicking in the toogle button calls the toogle function", () => {
    const onClickMock = jest.fn(() => {});
    const toogleBtn = (
      <button onClick={onClickMock} className="toogle-view">
        Toogle View
      </button>
    );
    act(() => {
      render(<Home title="Client" toogleBtn={toogleBtn} />, container);
    });

    const button = container.querySelector("button");
    act(() => {
      button.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });
    expect(onClickMock).toBeCalledTimes(1);
  });

  it("clicking in the toogle changes the view", () => {
    const Wrapper = () => {
      const [view, setView] = React.useState<"Client" | "Kitchen">("Client");

      const onClickMock = () =>
        setView(view === "Client" ? "Kitchen" : "Client");
      const toogleBtn = (
        <button onClick={onClickMock} className="toogle-view">
          Toogle View
        </button>
      );

      return (
        <Home title={view} toogleBtn={toogleBtn}>
          {
            // If to replace the use of the react-router
            view === "Client" ? (
              <div className="content">Hello Client</div>
            ) : (
              <div className="content">Hello Kitchen</div>
            )
          }
        </Home>
      );
    };

    act(() => {
      render(<Wrapper />, container);
    });

    expect(
      container.querySelector(".navbar-collapse .title").textContent
    ).toContain("Client view");
    expect(container.querySelector(".content").textContent).toContain(
      "Hello Client"
    );
    expect(container.querySelector(".content").textContent).not.toContain(
      "Hello Kitchen"
    );

    const button = container.querySelector("button");

    expect(button).toBeTruthy();

    act(() => {
      button.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });
    expect(
      container.querySelector(".navbar-collapse .title").textContent
    ).toContain("Kitchen view");
    expect(container.querySelector(".content").textContent).toContain(
      "Hello Kitchen"
    );
    expect(container.querySelector(".content").textContent).not.toContain(
      "Hello Client"
    );
  });
});
