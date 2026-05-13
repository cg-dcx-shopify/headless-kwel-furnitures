"use client";

import RemoveButton from "@/app/components/cart/RemoveButton";
import { useEffect, useState, useCallback } from "react";
import "@/app/components/main.css";
import { useCartDrawer } from "@/app/context/CartDrawerContext";
import { getCartId } from "@/lib/shopify/cartClient";
import CartQuantity from "./CartQuantity";
import { MdCancel } from "react-icons/md";

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();

  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

 // Fetch Cart
  const fetchCart = useCallback(async () => {
    const cartId = getCartId();
    if (!cartId) {
      setCart(null);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/cart/get?cartId=${cartId}`);
      const data = await res.json();
      setCart(data?.cart || null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen, fetchCart]);

  return (
    <>
     
      {isOpen && (
        <div className="cart-overlay" onClick={closeDrawer} />
      )}

     
      <div
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="cart-header">
          <strong>Shopping Cart</strong>
          <button onClick={closeDrawer} className="close-btn">
            <MdCancel size={24} />
          </button>
        </div>

      
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : !cart || !cart?.lines?.edges?.length ? (
          <p className="p-4">Cart is empty</p>
        ) : (
          <>
           
            <div className="cart-content">
              {cart.lines.edges.map(({ node }: any) => (
                <div key={node.id} className="drawer-item">
                  
                 
                  <div className="item-left">
                    <img
                      src={
                        node?.merchandise?.featuredImage?.url ||
                        "/placeholder.png"
                      }
                      alt={node?.merchandise?.product?.title || "Product"}
                    />

                    <div>
                      <h3>
                        {node?.merchandise?.product?.title}
                      </h3>

                      <p>Qty: {node.quantity}</p>

                      <p className="price">
                        {node?.cost?.totalAmount?.currencyCode}{" "}
                        {node?.cost?.totalAmount?.amount}
                      </p>
                    </div>
                  </div>

                  
                  <div className="item-right">
                    <CartQuantity
                      cartId={cart.id}
                      lineId={node.id}
                      initialQuantity={node.quantity}
                      onUpdate={fetchCart}
                    />

                    <RemoveButton
                      cartId={cart.id}
                      lineId={node.id}
                      onRemove={fetchCart}
                    />
                    
                  </div>
                  
                </div>
                
              ))}
               <div className="divider" />
            </div>
           

            
            <div className="cart-footer">
              <div className="total-row">
                <span>Total</span>
                <span>
                  {cart?.cost?.totalAmount?.currencyCode}{" "}
                  {cart?.cost?.totalAmount?.amount}
                </span>
              </div>

              <a href={cart?.checkoutUrl} className="checkout-btn">
                Checkout
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
``