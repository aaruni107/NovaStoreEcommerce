"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import "@/styles/cart.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CartSkeleton from "@/components/loading/skeleton/cart/CartSkeleton";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <>
        <Navbar />
        <CartSkeleton />
        <Footer />
      </>
    );
  }
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add products to start shopping.</p>

          <Link href="/" className="continue-btn">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="cart-page">
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                  />
                </div>

                <div className="cart-info">
                  <h3>{item.title}</h3>

                  <p className="price">₹{item.price.toFixed(2)}</p>

                  <div className="quantity-selector">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-right">
                  <h4>₹{(item.price * item.quantity).toFixed(2)}</h4>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div>
              <span>Subtotal</span>

              <strong>₹{totalPrice.toFixed(2)}</strong>
            </div>

            <div>
              <span>Shipping</span>

              <strong>Free</strong>
            </div>

            <hr />

            <div className="grand-total">
              <span>Total</span>

              <strong>₹{totalPrice.toFixed(2)}</strong>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}
