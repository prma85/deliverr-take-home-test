import React from "react";
import { Order } from "../../models";
import { ShowOrderItem } from "../../components";
import "./index.css";

interface KitchenProps {
  orders: Array<Order>;
  setOrderAsPickedUp: (id: number) => void;
}

const Kitchen: React.FC<KitchenProps> = ({ orders, setOrderAsPickedUp }) => {
  const openOrders = orders.filter((order) => order.status === "open");
  const closedOrders = orders.filter((order) => order.status === "picked-up");

  return (
    <div className="kitchen-page">
      <h3>Active Orders</h3>
      <div className="kitchen-open-orders">
        {openOrders.length > 0
          ? openOrders.map((order, index) => (
              <ShowOrderItem
                key={index}
                order={order}
                pickOrderUp={setOrderAsPickedUp}
              />
            ))
          : "There is no open orders yet"}
      </div>
      <hr />
      <h3>Picked-up Orders</h3>
      <div className="kitchen-picked-up-orders">
        {closedOrders.length > 0
          ? closedOrders.map((order, index) => (
              <ShowOrderItem key={index} order={order} />
            ))
          : "There is no picked-up orders yet"}
      </div>
    </div>
  );
};

export default Kitchen;
