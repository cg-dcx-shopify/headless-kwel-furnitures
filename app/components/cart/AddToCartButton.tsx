"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCartId, setCartId } from "@/lib/shopify/cartClient";
import { useCartDrawer } from "@/app/context/CartDrawerContext";    
interface AddToCartButtonProps {
  variantId: string;
  quantity: number;
  note: string;
  buttonText?: string;
}

export default function AddToCartButton({
  variantId,
  quantity,
  note,
  buttonText = "Add to Cart",
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
const { openDrawer } = useCartDrawer();
  async function handleAddToCart() {
    if (loading) return;
    setLoading(true);

    try {
      const cartId = getCartId();

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add", 
          cartId,
          variantId,
          quantity,
          note,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCartId(data.cartId);
      openDrawer();
    } catch (err) {
      console.error("Add to cart failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
    >
      {loading ? "Adding…" : buttonText}
    </button>
  );
}