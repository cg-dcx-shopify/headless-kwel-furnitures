// lib/shopify/cart.ts
import { shopifyFetch } from "@/lib/shopify/shopify";

/* CREATE CART */
const CART_CREATE = `
mutation {
  cartCreate {
    cart {
      id
    }
  }
}
`;

/* ADD TO CART */
export const ADD_TO_CART = `
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
    }
  }
}
`;

/* UPDATE CART */
export const UPDATE_CART_LINES = `
mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
    }
  }
}
`;

/* REMOVE CART */
export const REMOVE_CART_LINES = `
mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      totalQuantity
    }
  }
}
`;

export async function createCart(): Promise<string> {
  const res = await shopifyFetch<any>({ query: CART_CREATE });
  return res.data.cartCreate.cart.id;
}