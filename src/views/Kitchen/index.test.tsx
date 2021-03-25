import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Kitchen from "./index";
import { Order } from "../../models";

let container: any = null;

const propsMock = {
  orders: [
    {
      desc: {
        1: {
          item: "BLT",
          unitPrice: 9.99,
          quantity: 1
        }
      },
      total: 9.99,
      id: 1,
      status: "open"
    },
    {
      desc: {
        1: {
          item: "BLT",
          unitPrice: 9.99,
          quantity: 2
        },
        2: {
          item: "Vegetarian",
          unitPrice: 8.99,
          quantity: 1
        }
      },
      total: 28.87,
      id: 2,
      status: "picked-up"
    }
  ] as Array<Order>,
  setOrderAsPickedUp: jest.fn((id) => {})
};

describe("Test Kitchen view", () => {
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

  it("Kitchen should load empty if no orders", () => {
    act(() => {
      render(
        <Kitchen
          orders={[]}
          setOrderAsPickedUp={propsMock.setOrderAsPickedUp}
        />,
        container
      );
    });

    expect(container.querySelector(".kitchen-page")).toBeTruthy();
    expect(
      container.querySelector(".kitchen-open-orders").textContent
    ).toContain("There is no open orders yet");
    expect(
      container.querySelector(".kitchen-picked-up-orders").textContent
    ).toContain("There is no picked-up orders yet");
  });

  it("renders with initial data in the right place", () => {
    act(() => {
      render(
        <Kitchen
          orders={propsMock.orders}
          setOrderAsPickedUp={propsMock.setOrderAsPickedUp}
        />,
        container
      );
    });

    expect(container.querySelector(".kitchen-page")).toBeTruthy();
    // check if there is only one element as per mock
    expect(
      container.querySelector(".kitchen-open-orders").childElementCount
    ).toBe(1);
    expect(
      container.querySelector(".kitchen-picked-up-orders").childElementCount
    ).toBe(1);

    // check if the element on each are match the mock
    const open = container.querySelector(".kitchen-open-orders").children[0];
    const picked = container.querySelector(".kitchen-picked-up-orders")
      .children[0];

    expect(open.querySelector(".order-title").textContent).toContain(
      `Order #${propsMock.orders[0].id}`
    );
    expect(open.querySelector(".order-total").textContent).toContain(
      `Total: $${propsMock.orders[0].total}`
    );
    expect(open.querySelector("button").disabled).toBeFalsy();
    const openKeys = Object.keys(propsMock.orders[0].desc);
    expect(open.querySelectorAll(".order-item-desc-row").length).toBe(
      openKeys.length
    );

    expect(picked.querySelector(".order-title").textContent).toContain(
      `Order #${propsMock.orders[1].id}`
    );
    expect(picked.querySelector(".order-total").textContent).toContain(
      `Total: $${propsMock.orders[1].total}`
    );
    expect(picked.querySelector("button").disabled).toBeTruthy();
    const pickedKeys = Object.keys(propsMock.orders[1].desc);
    expect(picked.querySelectorAll(".order-item-desc-row").length).toBe(
      pickedKeys.length
    );
  });

  it("call function clicked to picked up order", () => {
    act(() => {
      render(
        <Kitchen
          orders={propsMock.orders}
          setOrderAsPickedUp={propsMock.setOrderAsPickedUp}
        />,
        container
      );
    });

    expect(container.querySelector(".kitchen-page")).toBeTruthy();
    const open = container.querySelector(".kitchen-open-orders").children[0];
    open.querySelector("button").click();
    expect(propsMock.setOrderAsPickedUp).toHaveBeenCalled();
  });

  it("change order as completed after clicking on picked-up button", () => {
    const Wrapper = () => {
      const [state, setState] = React.useState(propsMock.orders);
      const setOrderAsPickedUp = (orderID: number) => {
        let orders = [...state];
        const index = orders.findIndex((order) => order.id === orderID);
        orders[index].status = "picked-up";
        setState(orders);
      };
      return <Kitchen orders={state} setOrderAsPickedUp={setOrderAsPickedUp} />;
    };

    act(() => {
      render(<Wrapper />, container);
    });

    expect(container.querySelector(".kitchen-page")).toBeTruthy();
    const open = container.querySelector(".kitchen-open-orders");
    const pickedUp = container.querySelector(".kitchen-picked-up-orders");
    // check if there is only one element as per mock
    expect(open.childElementCount).toBe(1);
    expect(pickedUp.childElementCount).toBe(1);

    // click in the button to change the state
    const button = open.children[0].querySelector("button");
    act(() => {
      button.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    // check if state has changed
    expect(open.childElementCount).toBe(0);
    expect(pickedUp.childElementCount).toBe(2);
  });
});
