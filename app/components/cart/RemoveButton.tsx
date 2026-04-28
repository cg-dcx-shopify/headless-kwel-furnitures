"use client";

import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import "@/app/components/main.css";
type Props = {
  cartId: string;
  lineId: string;
};

export default function RemoveButton({ cartId, lineId }: Props) {
  const router = useRouter();

  async function handleRemove() {
    await fetch("/api/cart", {
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

    router.refresh(); // re-fetch cart page
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