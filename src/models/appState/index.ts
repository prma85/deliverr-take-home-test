import { Inventory, Menu, Order } from "../";

export default interface AppState {
  inventory: Inventory | null;
  menu: Array<Menu> | null;
  currentID: number;
  orders: Array<Order>;
  activeView: "Client" | "Kitchen";
  isLoading: boolean;
}
