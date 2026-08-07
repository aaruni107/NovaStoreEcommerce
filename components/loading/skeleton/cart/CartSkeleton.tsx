"use client";

import "@/styles/cart.css";

export default function CartSkeleton() {
  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-items">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="cart-item skeleton-item" key={index}>
              <div className="skeleton skeleton-image"></div>

              <div className="cart-info">
                <div className="skeleton skeleton-title"></div>

                <div className="skeleton skeleton-price"></div>

                <div className="skeleton skeleton-qty"></div>
              </div>

              <div className="cart-right">
                <div className="skeleton skeleton-total"></div>

                <div className="skeleton skeleton-icon"></div>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <div className="skeleton skeleton-summary-title"></div>

          <div className="skeleton skeleton-line"></div>

          <div className="skeleton skeleton-line"></div>

          <div className="skeleton skeleton-button"></div>
        </aside>
      </div>
    </section>
  );
}
