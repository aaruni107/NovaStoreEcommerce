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

      const cacheKey = "category-cache";

      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const allProducts: Product[] = JSON.parse(cached);

        const categoryProducts = allProducts.filter(
          (p) => p.category === category,
        );

        if (categoryProducts.length > 0) {
          setProducts(categoryProducts);
          setLoading(false);
          return;
        }
      }

      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`,
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
            ? Math.round(item.price / (1 - item.discountPercentage / 100))
            : null,
        rating: item.rating,
        reviewCount: item.reviews.length,
        reviews: item.reviews,
        category: item.category,
        badge: item.discountPercentage > 0 ? "Sale" : "New",
        instock: item.availabilityStatus,
      }));

      setProducts(formatted);

      let allProducts: Product[] = cached ? JSON.parse(cached) : [];

      // Merge without duplicates
      const productMap = new Map<number, Product>();

      allProducts.forEach((product) => productMap.set(product.id, product));
      formatted.forEach((product) => productMap.set(product.id, product));

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(Array.from(productMap.values())),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <section className="container py-5">
        <h1 className="mb-5 text-capitalize">{slug}</h1>

        <FeaturedProducts products={products} loading={loading} />
      </section>

      <Footer />
    </>
  );
}
