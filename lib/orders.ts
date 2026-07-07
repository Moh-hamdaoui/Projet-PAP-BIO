import ordersData from "@/data/orders.json";

export interface OrderSummary {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: string;
  items: string[];
}

function getSeedOrders(): OrderSummary[] {
  return (ordersData.orders as OrderSummary[]).map((order) => ({ ...order }));
}

export function getOrdersForUser(userId: string): OrderSummary[] {
  return getSeedOrders().filter((order) => order.userId === userId);
}
