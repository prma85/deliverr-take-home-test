import { Inventory } from "../";
export default interface Menu {
  name: string;
  price: number;
  ingredients: Inventory;
}
