import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Inventory } from "../../models";
import Client from "./index";

let container = null;
const sleep = async (timer) =>
  new Promise((resolve) => setTimeout(resolve, timer));
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

describe("Test Client view", () => {
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

  it("loads default page", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={[]}
          inventory={{} as Inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".my-order")).toBeTruthy();
  });

  it("loads default page with data", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={data.menu}
          inventory={data.inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const menuItems = container.querySelectorAll(".menu-item");
    const randomId = Math.floor(Math.random() * data.menu.length);

    const [title, price] = menuItems[randomId]
      .querySelector("h3")
      .textContent.split(" - $ ");
    expect(title).toBe(data.menu[randomId].name);
    expect(price).toBe(data.menu[randomId].price.toString());
  });

  it("cannot click in the button without an item in the order", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={data.menu}
          inventory={data.inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const button = container.querySelector(".my-order button");

    act(() => {
      button.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(placeOrderMock).not.toBeCalled();
  });

  it("clicking add to order shows the summary and updates the total", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={data.menu}
          inventory={data.inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const menuItems = container.querySelectorAll(".menu-item");
    const myOrder = container.querySelector(".my-order");
    const randomId1 = Math.floor(Math.random() * data.menu.length);

    act(() => {
      const buttonItem = menuItems[randomId1].querySelector("button");
      buttonItem.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    let total = data.menu[randomId1].price;
    expect(myOrder.querySelector(".order-total").textContent).toContain(
      total.toString()
    );
    expect(myOrder.querySelectorAll(".item-row").length).toBe(1);

    // add another item to the order

    const randomId2 = Math.floor(Math.random() * data.menu.length);

    act(() => {
      const buttonItem = menuItems[randomId2].querySelector("button");
      buttonItem.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    total += data.menu[randomId2].price;
    expect(myOrder.querySelector(".order-total").textContent).toContain(
      total.toString()
    );
  });

  it("calls place order when clicked in the button with items in the order", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={data.menu}
          inventory={data.inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const menuItems = container.querySelectorAll(".menu-item");
    const randomId = Math.floor(Math.random() * data.menu.length);

    const buttonItem = menuItems[randomId].querySelector("button");
    const buttonOrder = container.querySelector(".my-order button");

    act(() => {
      buttonItem.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    act(() => {
      buttonOrder.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(placeOrderMock).toHaveBeenCalledTimes(1);
  });

  it("cannot call place order more than one time per order", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={data.menu}
          inventory={data.inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const menuItems = container.querySelectorAll(".menu-item");
    const randomId = Math.floor(Math.random() * data.menu.length);

    const buttonItem = menuItems[randomId].querySelector("button");
    const buttonOrder = container.querySelector(".my-order button");

    act(() => {
      buttonItem.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    act(() => {
      buttonOrder.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(placeOrderMock).toHaveBeenCalledTimes(1);
    expect(buttonOrder.disabled).toBeTruthy();
  });

  it("cancel order button disables place order and clean the order", () => {
    const placeOrderMock = jest.fn((a, b) => {});
    act(() => {
      render(
        <Client
          menu={data.menu}
          inventory={data.inventory}
          placeOrder={placeOrderMock}
        />,
        container
      );
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const menuItems = container.querySelectorAll(".menu-item");
    const randomId = Math.floor(Math.random() * data.menu.length);

    const buttonItem = menuItems[randomId].querySelector("button");
    const buttonOrder = container.querySelector(".my-order .place-order");
    const buttonCancel = container.querySelector(".my-order .cancel-order");

    act(() => {
      buttonItem.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    act(() => {
      buttonCancel.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    act(() => {
      buttonOrder.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(placeOrderMock).toHaveBeenCalledTimes(0);
    expect(buttonOrder.disabled).toBeTruthy();
  });

  it("cannot add more items if the inventory is empty", async () => {
    const Wrapper = () => {
      const [inventory, setInventory] = React.useState(data.inventory);
      const placeOrder = (_order, newInventory) => {
        setInventory(newInventory);
      };
      return (
        <Client
          menu={data.menu}
          inventory={inventory}
          placeOrder={placeOrder}
        />
      );
    };
    act(() => {
      render(<Wrapper />, container);
    });

    expect(container.querySelector(".client-page")).toBeTruthy();
    expect(container.querySelector(".menu-items").childElementCount).toBe(
      data.menu.length
    );

    const menuItems = container.querySelectorAll(".menu-item");

    const buttonItemVegetarian = menuItems[0].querySelector("button");
    const buttonItemTurkey = menuItems[2].querySelector("button");

    expect(container.querySelector(".my-order .order-total").textContent).toBe(
      "Total: $ 0"
    );

    expect(buttonItemVegetarian.disabled).toBeFalsy();
    expect(buttonItemTurkey.disabled).toBeFalsy();

    const clickBtnVegetarian = () =>
      buttonItemVegetarian.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: false
        })
      );
    const clickBtnTurkey = () =>
      buttonItemTurkey.dispatchEvent(
        new window.Event("click", {
          bubbles: true,
          cancelable: false
        })
      );

    // doing like that because using a for inside of the act
    // to trigger the button 5 times is not working,
    // it is only triggering one
    await act(async () => {
      for (let i = 0; i < 5; i++) {
        await sleep(100);
        clickBtnTurkey();
      }
    });

    let total =
      Math.round((data.menu[2].price * 5 + Number.EPSILON) * 100) / 100;
    expect(container.querySelector(".my-order .order-total").textContent).toBe(
      `Total: $ ${total}`
    );

    expect(buttonItemVegetarian.disabled).toBeFalsy();
    expect(buttonItemTurkey.disabled).toBeTruthy();

    await act(async () => {
      for (let i = 0; i < 2; i++) {
        await sleep(100);
        clickBtnVegetarian();
      }
    });

    total =
      Math.round((total + (data.menu[0].price * 2 + Number.EPSILON)) * 100) /
      100;

    expect(container.querySelector(".my-order .order-total").textContent).toBe(
      `Total: $ ${total}`
    );

    expect(buttonItemVegetarian.disabled).toBeTruthy();
    expect(buttonItemTurkey.disabled).toBeTruthy();
  });
});
