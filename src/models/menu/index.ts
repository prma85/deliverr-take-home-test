import { Inventory } from "../";

type AllIngredients = Record<keyof Inventory, number>;

export default interface Menu {
  name: string;
  price: number;
  ingredients: Partial<AllIngredients>;
}
