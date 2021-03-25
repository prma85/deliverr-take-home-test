import * as React from "react";
import { OrderDesc } from "../../models/order";

interface OrderDescProps {
  item: OrderDesc;
}

const OrderDescItem: React.FC<OrderDescProps> = ({ item }) => {
  return (
    <div className="order-item-desc-row">
      - {item.quantity}x {item.item}
    </div>
  );
};

export default OrderDescItem;
