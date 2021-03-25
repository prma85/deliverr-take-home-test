import fetchData from "./fetchData";

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

const sleep = async (timer: number) =>
  new Promise((resolve) => setTimeout(resolve, timer));

describe("Test helpers", () => {
  test("the data matches the mock", () => {
    return fetchData("./data.json").then((response) => {
      expect(response).toStrictEqual(data);
    });
  });

  test("the fetch fails with an error", () => {
    expect.assertions(1);
    return fetchData("e").catch((e) => expect(e).toMatch("error"));
  });

  test("a callback is called after 1000ms", async () => {
    const timer = 1000;
    const mockCallback = jest.fn((_) => {});
    await fetchData("./data.json", mockCallback);
    await sleep(timer);
    expect(mockCallback).toHaveBeenCalled();
  });

  test("a callback is called after 100ms", async () => {
    const timer = 100;
    const mockCallback = jest.fn((_) => {});
    await fetchData("./data.json", mockCallback, timer);
    await sleep(timer);
    expect(mockCallback).toHaveBeenCalled();
  });
});
