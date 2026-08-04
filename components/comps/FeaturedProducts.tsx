"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import ProductSkeleton from "../loading/loading";

interface Props {
  products: Product[];
  loading: boolean;
}

export default function FeaturedProducts({ products, loading }: Props) {
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <span className="section-badge">Featured</span>

          <h2 className="section-title">Featured Products</h2>

          <p className="section-subtitle">
            Hand-picked gadgets loved by thousands.
          </p>
        </div>

        <button className="btn btn-outline-primary rounded-pill px-4">
          View All
        </button>
      </div>

      <div className="product-tabs-container mb-5">
        <div className="product-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={activeTab === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <ProductSkeleton />
              </div>
            ))
          : filtered.map((product) => (
              <div className="col-md-6 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
