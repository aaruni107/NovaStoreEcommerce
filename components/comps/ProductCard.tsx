"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      {product.instock && (
        <span className="product-badge">{product.instock}</span>
      )}
      <button className="wishlist-btn">
        <Heart size={18} />
      </button>

      <Link href={`/product/${product.slug}`}>
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-fit-contain"
          />
        </div>
      </Link>

      <div className="product-body">
        <small className="text-secondary">{product.brand}</small>

        <h5>{product.name}</h5>

        <div className="rating">
          <Star fill="#FFD700" color="#FFD700" size={16} />

          {product.rating}

          <span>({product.reviewCount})</span>
        </div>

        <div className="price">
          <span className="sale-price">₹{product.price.toLocaleString()}</span>

          {product.salePrice && (
            <span className="old-price">
              ₹{product.salePrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="product-actions">
          <button className="cart-btn">
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button className="quick-btn">
            <Eye size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
