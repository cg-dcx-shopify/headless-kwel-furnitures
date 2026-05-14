import { shopifyFetch } from "@/lib/shopify/shopify";
import RemoveButton from "@/app/components/cart/RemoveButton";
import CartQuantity from "../components/cart/CartQuantity";

const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    checkoutUrl
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              title
              product {
                title
              }
              price {
                amount
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
  const { cartId: rawCartId } = await searchParams;

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
          <li key={node.id} className="flex justify-between border-b pb-4">
            
            <div>
              <strong>{node.merchandise.product.title}</strong>
              <p className="text-sm text-gray-600">
                {node.merchandise.title}
              </p>

              {/* ITEM PRICE */}
              <p className="text-sm mt-1">
                ₹ {node.merchandise.price.amount} × {node.quantity}
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

     
      <div className="pt-17 space-y-3">

        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>
            ₹ {cart.cost.subtotalAmount.amount}
          </span>
        </div>

        <div className="flex justify-between text-xl font-semibold">
          <span>Total</span>
          <span>
            ₹ {cart.cost.totalAmount.amount}
          </span>
        </div>

        {/* ✅ CHECKOUT BUTTON */}
        <a href={cart.checkoutUrl} className="block">
          <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </a>

      </div>

    </main>
  );
}