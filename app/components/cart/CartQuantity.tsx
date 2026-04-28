"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import QuantityBtn from "@/app/components/products/QuantityBtn";

type Props = {
  cartId: string;
  lineId: string;
  initialQuantity: number;
};

export default function CartQuantity({
  cartId,
  lineId,
  initialQuantity,
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (quantity === initialQuantity) return;

    startTransition(async () => {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          cartId,
          lineId,
          quantity,
        }),
      });

      router.refresh(); // re-fetch server cart
    });
  }, [quantity]);

  return (
    <div className="opacity-100">
      <QuantityBtn quantity={quantity} setQuantity={setQuantity} />
      {isPending && (
        <span className="text-xs text-gray-400">Updating…</span>
      )}
    </div>
  );
}