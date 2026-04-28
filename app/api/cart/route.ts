import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/shopify";
import {
  ADD_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_CART_LINES,
  createCart,
} from "@/lib/shopify/cart";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      action = "add", // ✅ default to add
      cartId,
      variantId,
      quantity = 1,
      note,
      lineId,
    } = body;

    /* ---------- ADD TO CART ---------- */
    if (action === "add") {
      const finalCartId = cartId ?? (await createCart());

      await shopifyFetch({
        query: ADD_TO_CART,
        variables: {
          cartId: finalCartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity,
              attributes: note
                ? [{ key: "Note", value: note }]
                : [],
            },
          ],
        },
      });

      return NextResponse.json({ cartId: finalCartId });
    }

    /* ---------- UPDATE ---------- */
    if (action === "update") {
      await shopifyFetch({
        query: UPDATE_CART_LINES,
        variables: {
          cartId,
          lines: [{ id: lineId, quantity }],
        },
      });

      return NextResponse.json({ success: true });
    }

    /* ---------- REMOVE ---------- */
    if (action === "remove") {
      await shopifyFetch({
        query: REMOVE_CART_LINES,
        variables: {
          cartId,
          lineIds: [lineId],
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid cart action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json(
      { error: "Cart operation failed" },
      { status: 500 }
    );
  }
}
``