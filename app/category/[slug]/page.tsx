"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FeaturedProducts from "@/components/comps/FeaturedProducts";

import { Product } from "@/types/product";

export default function CategoryPage() {
  const { slug } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProducts(slug as string);
    }
  }, [slug]);

  async function fetchProducts(category: string) {
    try {
      setLoading(true);

      const cacheKey = `category-${category}`;

      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        setProducts(JSON.parse(cached));
        return;
      }

      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );

      const data = await res.json();

      const formatted: Product[] = data.products.map((item: any) => ({
        id: item.id,
        name: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, "-"),
        brand: item.brand,
        image: item.thumbnail,
        images: item.images,
        price: item.price,
        salePrice:
          item.discountPercentage > 0
            ? Math.round(
                item.price /
                  (1 - item.discountPercentage / 100)
              )
            : null,
        rating: item.rating,
        reviewCount: item.reviews.length,
        reviews: item.reviews,
        category: item.category,
        badge:
          item.discountPercentage > 0
            ? "Sale"
            : "New",
        instock: item.availabilityStatus,
      }));

      setProducts(formatted);

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(formatted)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <section className="container py-5">

        <h1 className="mb-5 text-capitalize">
          {slug}
        </h1>

        <FeaturedProducts
          products={products}
          loading={loading}
        />

      </section>

      <Footer />
    </>
  );
}