"use client";

import { Review } from "@/types/product";
import { h1 } from "framer-motion/client";
import { useState } from "react";
import {
  StarFill,
  Heart,
  Cart3,
  Dash,
  Plus,
  Truck,
  ArrowRepeat,
  ShieldCheck,
} from "react-bootstrap-icons";

interface Props {
  product: any;
}

export default function ProductInfo({ product }: Props) {
  const [qty, setQty] = useState(1);

  const numberCanAdd = () => {
    if (qty < product.stock) {
      setQty((prev) => prev + 1);
    }
  };
  const numberCanSubtract = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };
  return (
    <div className="product-info">
      <span className="product-brand">{product.brand}</span>

      <h1 className="product-title">{product.title}</h1>

      <div className="product-rating">
        <StarFill className="text-warning" />

        <span>{product.rating}</span>

        <small>({product.reviewCount} Reviews)</small>
      </div>

      <div className="product-price">
        <h2>₹{product.price}</h2>

        <span className="old-price">
          ₹{Math.round(product.price / (1 - product.salePrice / 100))}
        </span>

        <span className="discount">{Math.round(product.salePrice)}% OFF</span>
      </div>

      <div className="stock-status">
        <span
          className={
            product.availabilityStatus === "In Stock"
              ? "stock-success"
              : "stock-warning"
          }
        >
          {product.availabilityStatus}
        </span>
      </div>

      <p className="product-description">{product.description}</p>

      <hr />

      <div className="qty-wrapper">
        <label>Quantity</label>

        <div className="qty-box">
          <button disabled={qty === 1} onClick={numberCanSubtract}>
            <Dash />
          </button>

          <span>{qty}</span>

          <button onClick={numberCanAdd}>
            <Plus />
          </button>
        </div>
      </div>

      <div className="product-buttons">
        <button className="btn-cart">
          <Cart3 />
          Add To Cart
        </button>

        <button className="btn-buy">Buy Now</button>

        <button className="btn-wishlist">
          <Heart />
        </button>
      </div>

      <div className="product-features">
        <div>
          <Truck />

          <div>
            <h6>Free Delivery</h6>

            <small>On orders above ₹999</small>
          </div>
        </div>

        <div>
          <ArrowRepeat />

          <div>
            <h6>Easy Returns</h6>

            <small>7 Days Return Policy</small>
          </div>
        </div>

        <div>
          <ShieldCheck />

          <div>
            <h6>Warranty</h6>

            <small>1 Year Manufacturer Warranty</small>
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h3 className="mb-4">Customer Reviews ({product.reviewCount})</h3>
      </div>
    </div>
  );
}
