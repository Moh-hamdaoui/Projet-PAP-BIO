import ordersData from "@/data/orders.json";

export type DeliveryMethod = "pickup" | "delivery";

export interface DeliveryDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
}

export interface OrderSummary {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: string;
  items: string[];
  deliveryMethod?: DeliveryMethod;
  delivery?: DeliveryDetails;
}

export interface CreateOrderInput {
  userId: string;
  items: string[];
  total: number;
  deliveryMethod: DeliveryMethod;
  delivery?: DeliveryDetails;
}

const ORDERS_STORAGE_KEY = "pap-bio-orders";

function getSeedOrders(): OrderSummary[] {
  return (ordersData.orders as OrderSummary[]).map((order) => ({ ...order }));
}

function getStoredOrders(): OrderSummary[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as OrderSummary[];
  } catch {
    return [];
  }
}

function saveStoredOrders(orders: OrderSummary[]): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
}

export function getAllOrders(): OrderSummary[] {
  return [...getSeedOrders(), ...getStoredOrders()];
}

function formatOrderTotal(total: number): string {
  return `${total.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

function generateOrderId(): string {
  const allOrders = getAllOrders();
  const maxNumber = allOrders.reduce((max, order) => {
    const match = order.id.match(/^CMD-(\d+)$/);
    if (!match) {
      return max;
    }
    return Math.max(max, Number.parseInt(match[1], 10));
  }, 1000);

  return `CMD-${maxNumber + 1}`;
}

export function createOrder(input: CreateOrderInput): OrderSummary {
  const order: OrderSummary = {
    id: generateOrderId(),
    userId: input.userId,
    date: new Date().toISOString().slice(0, 10),
    status: "En cours",
    total: formatOrderTotal(input.total),
    items: input.items,
    deliveryMethod: input.deliveryMethod,
    ...(input.delivery ? { delivery: input.delivery } : {}),
  };

  const stored = getStoredOrders();
  saveStoredOrders([...stored, order]);

  return order;
}

export function getOrdersForUser(userId: string): OrderSummary[] {
  return getAllOrders().filter((order) => order.userId === userId);
}
