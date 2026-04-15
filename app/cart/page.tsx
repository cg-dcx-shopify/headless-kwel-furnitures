import { shopifyFetch } from "@/lib/shopify/shopify";

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
  // ✅ unwrap params
  const { cartId: rawCartId } = await searchParams;

  // ❌ no cart id
  if (!rawCartId) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </main>
    );
  }

  // ✅ decode Shopify cart id
  const cartId = decodeURIComponent(rawCartId);

  let result;

  try {
    result = await shopifyFetch<any>({
      query: GET_CART,
      variables: { cartId },
    });
  } catch (error) {
    console.error("Fetch cart error:", error);

    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Error loading cart</h1>
      </main>
    );
  }

  // 🔍 debug (optional)
  console.log("SHOPIFY RESPONSE:", JSON.stringify(result, null, 2));

  // ✅ SAFE ACCESS (prevents crash)
  const cart = result?.data?.cart;

  // ❌ invalid / expired cart
  if (!cart) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Your Cart ({cart.totalQuantity})
      </h1>

    <ul className="space-y-4">
  {cart.lines.edges.map(({ node }: any) => (
    <li
      key={node.id}
      className="flex justify-between border-b pb-2"
    >
      <div>
        <strong>{node.merchandise.product.title}</strong>

        <p className="text-sm text-gray-600">
          {node.merchandise.title}
        </p>

        {node.merchandise.selectedOptions.map((opt: any) => (
          <p key={opt.name} className="text-xs text-gray-500">
            {opt.name}: {opt.value}
          </p>
        ))}

        {node.attributes?.map((attr: any) => (
          <p key={attr.key} className="text-xs text-gray-500">
            {attr.key}: {attr.value}
          </p>
        ))}
      </div>

      <span>Qty: {node.quantity}</span>
    </li>
  ))}
    </ul>
    </main>
  );
}