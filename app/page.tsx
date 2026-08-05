"use client";
import Categories from "@/components/comps/Categories";
import FeaturedProducts from "@/components/comps/FeaturedProducts";
import Hero from "@/components/comps/hero";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import HomeSkeleton from "@/components/loading/skeleton/HomeSkeleton";
export default function Home() {
  const categories = [
    {
      id: 1,
      name: "Headphones",
      slug: "headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      productCount: 124,
    },
    {
      id: 2,
      name: "Laptops",
      slug: "laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      productCount: 82,
    },
    {
      id: 3,
      name: "Smart Watches",
      slug: "smart-watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      productCount: 56,
    },
    {
      id: 4,
      name: "Gaming",
      slug: "gaming",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
      productCount: 97,
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage: number) => {
    try {
      setLoading(true);
      const cacheKey = `products-page-${currentPage}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        setProducts(JSON.parse(cached));
        setLoading(false);
        return;
      }
      const skip = (currentPage - 1) * limit;

      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );

      const data = await res.json();

      const formattedProducts: Product[] = data.products.map((item: any) => ({
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

      setProducts(formattedProducts);
      sessionStorage.setItem(cacheKey, JSON.stringify(formattedProducts));
      const allProducts: Product[] = JSON.parse(
        sessionStorage.getItem("products-cache") || "[]",
      );

      const updatedCache = [...allProducts];

      formattedProducts.forEach((product) => {
        const index = updatedCache.findIndex((item) => item.id === product.id);

        if (index === -1) {
          // New product
          updatedCache.push(product);
        } else {
          // Existing product
          const cachedProduct = updatedCache[index];

          if (JSON.stringify(cachedProduct) !== JSON.stringify(product)) {
            updatedCache[index] = product;
          }
        }
      });

      sessionStorage.setItem("products-cache", JSON.stringify(updatedCache));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      {loading ? (
        <HomeSkeleton />
      ) : (
        <>
          <Hero />
          <Categories categories={categories} />
          <FeaturedProducts products={products} loading={loading} />
          <div className="d-flex justify-content-center mt-5 gap-2">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span className="align-self-center px-3">Page {page}</span>

            <button
              className="btn btn-primary"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
