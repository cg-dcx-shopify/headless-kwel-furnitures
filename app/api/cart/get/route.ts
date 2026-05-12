import { NextRequest, NextResponse } from "next/server";

import { shopifyFetch } from "@/lib/shopify/shopify";

import { GET_CART } from "@/lib/shopify/queries";

export async function GET(req: NextRequest) {
  const cartId =
    req.nextUrl.searchParams.get("cartId");

  // If no cart
  if (!cartId) {
    return NextResponse.json({
      cart: null,
    });
  }

  // Fetch cart from Shopify
  const res = await shopifyFetch<any>({
    query: GET_CART,
    variables: {
      cartId,
    },
  });

  // Return cart
  return NextResponse.json({
    cart: res.data.cart,
  });
}