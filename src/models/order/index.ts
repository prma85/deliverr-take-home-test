export interface OrderDesc {
  item: string;
  unitPrice: number;
  quantity: number;
}

export default interface Order {
  desc: Record<number, OrderDesc> | null;
  total: number;
  status: "open" | "picked-up";
  id?: number;
}
