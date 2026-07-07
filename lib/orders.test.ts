import { describe, expect, it } from "vitest";
import { getOrdersForUser } from "@/lib/orders";

describe("getOrdersForUser", () => {
  it("returns only the orders belonging to the connected user", () => {
    const orders = getOrdersForUser("user-1");

    expect(orders).toHaveLength(2);
    expect(orders[0]?.id).toBe("CMD-1001");
    expect(orders[1]?.id).toBe("CMD-1003");
  });
});
