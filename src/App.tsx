import React from "react";
import { AppState, Inventory, Order } from "./models";
import { Home, Client, Kitchen } from "./views";
import { Loading } from "./components";
import { fetchData } from "./helpers";
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
    this.toogleView = this.toogleView.bind(this);
  }

  componentDidMount() {
    if (!this.state.inventory) {
      fetchData("./data.json", (data) => {
        this.setState({
          inventory: data.inventory,
          menu: data.menu,
          isLoading: false
        });
      });
    }
  }

  toogleView() {
    const { activeView } = this.state;
    this.setState({
      activeView: activeView === "Client" ? "Kitchen" : "Client"
    });
  }

  placeOrder(order: Order, newInventory: Inventory) {
    const { orders, currentID } = this.state;
    order.id = currentID;
    const newOrdersList = [...orders, order];

    this.setState({
      orders: newOrdersList,
      currentID: currentID + 1,
      inventory: newInventory
    });
  }

  setOrderAsPickedUp(orderID: number) {
    let { orders } = this.state;
    const index = orders.findIndex((order) => order.id === orderID);
    orders[index].status = "picked-up";
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
          <Home title={this.state.activeView} toogleBtn={toogleBtn}>
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
