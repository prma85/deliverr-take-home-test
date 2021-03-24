import React from "react";
import { AppState, Inventory, Menu, Order } from "./models";
import { Home, Client, Kitchen } from "./views";
import { Loading } from "./components";

import "./styles.css";

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      inventory: null,
      menu: null,
      currentID: 1,
      orders: [],
      isLoading: true,
      activeView: "Client" // using it to not use extra libraries as react-router
    } as AppState;
    this.placeOrder = this.placeOrder.bind(this);
    this.setOrderAsPickedUp = this.setOrderAsPickedUp.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.toogleView = this.toogleView.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("./data.json")
      .then((data) => data.json())
      .then((data: { inventory: Inventory; menu: Array<Menu> }) => {
        // setTimeout used to simulate a API request
        // with 1s to show the loading state
        setTimeout(() => {
          this.setState({
            inventory: data.inventory,
            menu: data.menu,
            isLoading: false
          });
        }, 1000);
      });
  }

  toogleView() {
    const { activeView } = this.state;
    this.setState({
      activeView: activeView === "Client" ? "Kitchen" : "Client"
    });
  }

  placeOrder(order: Order, inventoryUsed: Inventory) {
    let { orders, currentID, inventory } = this.state;
    orders[currentID] = order;
    currentID++;

    const keys = Object.keys(inventoryUsed);
    keys.forEach((key) => {
      inventory[key] = inventory[key] - inventoryUsed[key];
    });

    this.setState({ orders, currentID, inventory });
  }

  setOrderAsPickedUp(orderID: number) {
    let { orders } = this.state;
    orders[orderID].status = "picked-up";
    this.setState({ orders });
  }

  render() {
    const { menu, inventory, orders } = this.state;
    const toogleBtn = (
      <button onClick={this.toogleView} className="toogle-view btn">
        Toogle View
      </button>
    );

    return (
      <div className="app">
        <Loading isLoading={this.state.isLoading}>
          <Home toogleBtn={toogleBtn}>
            {
              // If to replace the use of the react-router
              this.state.activeView === "Client" ? (
                <Client
                  menu={menu}
                  inventory={inventory}
                  placeOrder={this.placeOrder}
                />
              ) : (
                <Kitchen
                  orders={orders}
                  setOrderAsPickedUp={this.setOrderAsPickedUp}
                />
              )
            }
          </Home>
        </Loading>
      </div>
    );
  }
}
