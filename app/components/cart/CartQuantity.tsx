"use client";

import { useEffect, useState, useTransition } from "react";

type Props = {
  cartId: string;
  lineId: string;
  initialQuantity: number;
  onUpdate?: () => void; // ✅ callback to refresh parent
};

export default function CartQuantity({
  cartId,
  lineId,
  initialQuantity,
  onUpdate,
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isPending, startTransition] = useTransition();

  // ✅ Sync if parent updates
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  // ✅ Update cart when quantity changes
  useEffect(() => {
    if (quantity === initialQuantity) return;

    startTransition(async () => {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          cartId,
          lineId,
          quantity,
        }),
      });

      onUpdate?.(); // ✅ refresh drawer data
    });
  }, [quantity, cartId, lineId, initialQuantity, onUpdate]);

  return (
    <div className="flex flex-col items-center">
      {/* ✅ Simple Quantity Controls */}
      <div className="flex items-center border rounded">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-2"
        >
          -
        </button>

        <span className="px-3 text-sm">{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-2"
        >
          +
        </button>
      </div>

      {isPending && (
        <span className="text-xs text-gray-400 mt-1">
          Updating…
        </span>
      )}
    </div>
  );
}
``