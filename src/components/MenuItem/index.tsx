import * as React from "react";
import { Menu } from "../../models";
import "./index.css";

interface MenuItemProps {
  item: Menu;
  id: number;
  isDisabled: boolean;
  onClickItem: (id: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  isDisabled,
  item,
  id,
  onClickItem
}) => {
  const className = isDisabled ? "disabled " : "";
  const btnText = isDisabled ? "Out of stock" : "Add to order";
  return (
    <div className="menu-item card">
      <div className="menu-img">
        <img
          alt={`generic burguer ${id}`}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Lanche_Bauru.jpg"
        />
      </div>
      <h3>
        {item.name} - $ {item.price}
      </h3>
      <button
        disabled={isDisabled}
        className={`${className}btn add-item`}
        onClick={() => onClickItem(id)}
      >
        {btnText}
      </button>
    </div>
  );
};

export default MenuItem;
