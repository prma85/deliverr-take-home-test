export interface OrderDesc {
  item: string;
  unitPrice: number;
  quantity: number;
}

export default interface Order {
  desc: Record<number | string, OrderDesc>;
  total: number;
  status: "open" | "picked-up";
  id?: number;
}
