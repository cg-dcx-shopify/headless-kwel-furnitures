 "use client";
import RemoveButton from "@/app/components/cart/RemoveButton";
import { useEffect, useState } from "react";
import "@/app/components/main.css";
import { useCartDrawer } from "@/app/context/CartDrawerContext";

import { getCartId } from "@/lib/shopify/cartClient";

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();

  const [cart, setCart] = useState<any>(null);

  async function fetchCart() {
    const cartId = getCartId();

    if (!cartId) return;

    const res = await fetch(
      `/api/cart/get?cartId=${cartId}`
    );

    const data = await res.json();

    setCart(data.cart);
  }

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  return (
    <>
      
      {isOpen && (
        <div
          className="cart-overlay"
          onClick={closeDrawer}
        />
      )}

      {/* DRAWER */}
      <div
  className={`cart-drawer ${isOpen ? "open" : ""}`}
>
        {/* HEADER */}
        <div className="cart-header">

          <h2 className="text-xl font-semibold">
            Shopping Cart
          </h2>

          <button
            onClick={closeDrawer}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        {/* CONTENT */}
        {!cart ? (
          <p className="p-4">Cart is empty</p>
        ) : (
          <div className="cart-content">
  {cart.lines.edges.map(({ node }: any) => (
    <div
      key={node.id}
      className="drawer-item"
    >
      {/* LEFT SIDE */}
      <div>
        <h3 className="font-medium">
          {node.merchandise.product.title}
        </h3>

        <p className="text-sm text-gray-500">
          Qty: {node.quantity}
        </p>

        <p className="font-semibold mt-2">
          €{node.cost.totalAmount.amount}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <RemoveButton
        cartId={cart.id}
        lineId={node.id}
        onRemove={fetchCart} 
      />
    </div>
  ))}

  {/* FOOTER */}
  <div className="cart-footer">
    <div className="flex justify-between font-semibold">
      <span>Total</span>

      <span>
        €{cart.cost.totalAmount.amount}
      </span>
    </div>

    <a
      href={cart.checkoutUrl}
      className="block bg-black text-white text-center py-3 rounded-md mt-4"
    >
      Checkout
    </a>
  </div>
</div>
        )}
      </div>
    </>
  );
}