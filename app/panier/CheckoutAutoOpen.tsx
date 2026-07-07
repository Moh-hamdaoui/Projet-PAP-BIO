"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type CheckoutAutoOpenProps = {
  onOpen: () => void;
};

export default function CheckoutAutoOpen({ onOpen }: CheckoutAutoOpenProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("checkout") === "1") {
      onOpen();
    }
  }, [searchParams, onOpen]);

  return null;
}
