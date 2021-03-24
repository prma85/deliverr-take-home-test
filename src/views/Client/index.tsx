import React from "react";
import MenuItem from "../../components/MenuItem";
import { Inventory, Menu, Order } from "../../models";
import "./index.css";

interface ClientProps {
  menu: Array<Menu>;
  inventory: Inventory;
  placeOrder: (order: Order) => void;
}

const Client: React.FC<ClientProps> = ({ inventory, menu, placeOrder }) => {
  const [state, setState] = React.useState<Order>({
    desc: {},
    status: "open",
    total: 0.0
  });

  const [localInventory, setLocalInventory] = React.useState<Inventory>(
    inventory
  );

  const onClickItem = (id: number) => {
    // check if there is enough ingredients
    const item = menu[id];
    const ingredients = Object.keys(item.ingredients);

    // now need to substract the ingredients
    const tempInventory = { ...localInventory };
    ingredients.forEach((ingredient) => {
      tempInventory[ingredient] -= item.ingredients[ingredient];
    });

    // update the order
    let { desc, total } = state;
    if (!desc[id]) {
      desc[id] = {
        item: item.name,
        unitPrice: item.price,
        quantity: 1
      };
    } else {
      desc[id].quantity++;
    }
    total = total + desc[id].unitPrice;
    setState({
      total: Math.round((total + Number.EPSILON) * 100) / 100,
      desc,
      status: "open"
    });
    setLocalInventory(tempInventory);
    return;
  };

  return (
    <div className="client-page">
      <div className="menu-list">
        <div className="menu-items">
          {menu.map((item, index) => {
            const ingredients = Object.keys(item.ingredients);
            const isDisabled = ingredients.some(
              (ingredient) =>
                item.ingredients[ingredient] > localInventory[ingredient]
            );
            return (
              <MenuItem
                isDisabled={isDisabled}
                key={index}
                item={item}
                id={index}
                onClickItem={onClickItem}
              />
            );
          })}
        </div>
      </div>
      <div className="my-order">xdvdvxdvxdv xdvdvxdvxdvxdv d</div>
    </div>
  );
};

export default Client;
