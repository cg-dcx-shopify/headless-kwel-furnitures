"use client";

import { MdDelete } from "react-icons/md";

type Props = {
  cartId: string;
  lineId: string;

  onRemove?: () => void;
};

export default function RemoveButton({
  cartId,
  lineId,
  onRemove,
}: Props) {

  async function handleRemove() {

    try {

      const res = await fetch("/api/cart", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          action: "remove",
          cartId,
          lineId,
        }),
      });

      await res.json();

      // Refresh drawer cart data
      onRemove?.();

    } catch (error) {
      console.error("Remove failed:", error);
    }
  }

  return (
    <button
      onClick={handleRemove}
      className="remove-btn"
      aria-label="Remove item"
    >
       <MdDelete size={25} />
    </button>
  );
}
