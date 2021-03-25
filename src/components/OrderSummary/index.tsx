import * as React from "react";
import { Order } from "../../models";
import "./index.css";

interface OrderSummaryProps {
  data: Order;
  placeOrder: () => void;
  cancelOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  data,
  placeOrder,
  cancelOrder
}) => {
  const items = data.desc;
  const keys = Object.keys(items);
  return (
    <div className="order-summary-card card">
      <div className="order-summary">
        {keys.length > 0 ? (
          keys.map((key) => (
            <div className="item-row" key={key}>
              <div className="item-name">{items[key].item}</div>
              <div className="item-quantity">{items[key].quantity}</div>
              <div className="item-price">
                $
                {Math.round(
                  (items[key].quantity * items[key].unitPrice +
                    Number.EPSILON) *
                    100
                ) / 100}
              </div>
            </div>
          ))
        ) : (
          <div>No items added yet!</div>
        )}
      </div>
      <div className="order-total">Total: $ {data.total}</div>
      <div className="actions">
        <button
          onClick={placeOrder}
          disabled={keys.length === 0}
          className="btn secondary place-order"
        >
          Place Order
        </button>
        <button onClick={cancelOrder} className="btn cancel-order link">
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
