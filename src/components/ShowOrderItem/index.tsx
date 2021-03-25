import * as React from "react";
import { Order } from "../../models";
import OrderDesc from "./OrderDesc";
import "./index.css";

interface ShowOrderProps {
  order: Order;
  pickOrderUp?: (id: number) => void;
}

const ShowOrderItem: React.FC<ShowOrderProps> = ({ order, pickOrderUp }) => {
  const keys = Object.keys(order.desc);

  return (
    <div className={`order-card ${order.status} card`}>
      <div className="order-title">Order #{order.id}</div>
      {keys.map((key, index) => (
        <OrderDesc key={index} item={order.desc[key]} />
      ))}
      <div className="order-total">Total: ${order.total}</div>
      {order.status === "open" && pickOrderUp ? (
        <button
          className="btn secondary"
          onClick={() => pickOrderUp(order.id as number)}
        >
          Picked-Up
        </button>
      ) : (
        <button className="btn" disabled>
          Completed
        </button>
      )}
    </div>
  );
};

export default ShowOrderItem;
