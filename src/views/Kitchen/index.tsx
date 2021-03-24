import React from "react";
import { Order } from "../../models";

interface KitchenProps {
  orders: Record<number, Order>;
  setOrderAsPickedUp: (id: number) => void;
}

const Kitchen: React.FC<KitchenProps> = ({ orders, setOrderAsPickedUp }) => {
  return <div>"Hello Kitchen"</div>;
};

export default Kitchen;
