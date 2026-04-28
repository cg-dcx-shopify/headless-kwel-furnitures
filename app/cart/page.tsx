import { shopifyFetch } from "@/lib/shopify/shopify";
import RemoveButton from "@/app/components/cart/RemoveButton";
import CartQuantity from "../components/cart/CartQuantity";
const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    totalQuantity
    checkoutUrl
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          merchandise {
            ... on ProductVariant {
              title
              selectedOptions {
                name
                value
              }
              product {
                title
              }
            }
          }
        }
      }
    }
  }
}
`;

type Props = {
  searchParams: Promise<{
    cartId?: string;
  }>;
};

export default async function CartPage({ searchParams }: Props) {
  const { cartId: rawCartId } = await searchParams; // ✅ FIX

  if (!rawCartId) {
    return <h1 className="p-8">Your cart is empty</h1>;
  }

  const cartId = decodeURIComponent(rawCartId);

  const result = await shopifyFetch<any>({
    query: GET_CART,
    variables: { cartId },
  });

  const cart = result?.data?.cart;

  if (!cart) {
    return <h1 className="p-8">Your cart is empty</h1>;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Your Cart ({cart.totalQuantity})
      </h1>

      <ul className="space-y-4">
        {cart.lines.edges.map(({ node }: any) => (
          <li key={node.id} className="flex justify-between border-b pb-2">
  <div>
    <strong>{node.merchandise.product.title}</strong>
    <p className="text-sm text-gray-600">
      {node.merchandise.title}
    </p>
  </div>

  <div className="flex flex-col items-end gap-3">
    <CartQuantity
      cartId={cartId}
      lineId={node.id}
      initialQuantity={node.quantity}
    />
    <RemoveButton cartId={cartId} lineId={node.id} />
  </div>
</li>
        ))}
      </ul>
    </main>
  );
}