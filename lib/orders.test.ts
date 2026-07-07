import { beforeEach, describe, expect, it } from "vitest";
import { createOrder, getAllOrders, getOrdersForUser } from "@/lib/orders";

const ORDERS_STORAGE_KEY = "pap-bio-orders";

describe("orders", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("getOrdersForUser", () => {
    it("returns only the orders belonging to the connected user", () => {
      const orders = getOrdersForUser("user-1");

      expect(orders).toHaveLength(2);
      expect(orders[0]?.id).toBe("CMD-1001");
      expect(orders[1]?.id).toBe("CMD-1003");
    });
  });

  describe("createOrder", () => {
    it("persists a new order in localStorage", () => {
      const order = createOrder({
        userId: "user-1",
        items: ["Café El Palomar"],
        total: 28,
        deliveryMethod: "pickup",
      });

      expect(order.id).toBe("CMD-1004");
      expect(order.userId).toBe("user-1");
      expect(order.status).toBe("En cours");
      expect(order.total).toBe("28,00 €");
      expect(order.items).toEqual(["Café El Palomar"]);

      const stored = JSON.parse(window.localStorage.getItem(ORDERS_STORAGE_KEY) ?? "[]");
      expect(stored).toHaveLength(1);
      expect(stored[0]?.id).toBe("CMD-1004");
    });

    it("includes persisted orders in getOrdersForUser", () => {
      createOrder({
        userId: "user-1",
        items: ["Miel"],
        total: 15.5,
        deliveryMethod: "delivery",
        delivery: {
          email: "test@example.com",
          firstName: "Jean",
          lastName: "Dupont",
          address: "1 rue de la Paix",
          postalCode: "75001",
        },
      });

      const orders = getOrdersForUser("user-1");
      expect(orders).toHaveLength(3);
      expect(orders[2]?.id).toBe("CMD-1004");
      expect(orders[2]?.total).toBe("15,50 €");
      expect(orders[2]?.deliveryMethod).toBe("delivery");
      expect(orders[2]?.delivery?.postalCode).toBe("75001");
    });

    it("increments order ids from all existing orders", () => {
      createOrder({ userId: "user-1", items: ["A"], total: 10, deliveryMethod: "pickup" });
      createOrder({ userId: "user-2", items: ["B"], total: 20, deliveryMethod: "pickup" });

      const allOrders = getAllOrders();
      const storedIds = allOrders
        .filter((order) => order.id === "CMD-1004" || order.id === "CMD-1005")
        .map((order) => order.id);

      expect(storedIds).toEqual(["CMD-1004", "CMD-1005"]);
    });
  });
});
