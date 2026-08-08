"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "@/styles/wishlist.css";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
  } = useWishlist();

  // ✅ EMPTY STATE (OUTSIDE MAP)
  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />

        <section className="empty-wishlist">
          <h2>Your wishlist is empty ❤️</h2>
          <p>Add products to wishlist</p>

          <Link href="/" className="continue-btn">
            Continue Shopping
          </Link>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="wishlist-page">
        <div className="wishlist-header">
          <h2>My Wishlist ({totalItems})</h2>
        </div>

        <div className="wishlist-items">
          {wishlist.map((item) => {
            const slug = item.title
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <div className="wishlist-item" key={item.id}>
                {/* ✅ Clickable product */}
                <Link href={`/product/${slug}`}>
                  <div className="wishlist-left">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                    />

                    <div>
                      <h3>{item.title}</h3>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                </Link>

                {/* ✅ Actions (no redirect issue) */}
                <div className="wishlist-right">
                  <div className="quantity-selector">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQuantity(item.id);
                      }}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQuantity(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}