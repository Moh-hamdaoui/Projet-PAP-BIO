"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaiementPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/panier?checkout=1");
  }, [router]);

  return null;
}
