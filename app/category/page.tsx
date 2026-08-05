"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import CategoryCard from "@/components/category/CategoryCard";
import CategorySkeletonPage from "@/components/loading/skeleton/CategoryPageSkeleton";

import "@/styles/categories.css";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const PAGE_SIZE = 8;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visible < filteredCategories.length
        ) {
          setVisible((prev) =>
            Math.min(prev + PAGE_SIZE, filteredCategories.length)
          );
        }
      },
      {
        threshold: 1,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [visible]);

  async function fetchCategories() {
    const cache = sessionStorage.getItem("categories");

    if (cache) {
      setCategories(JSON.parse(cache));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://dummyjson.com/products/categories"
      );

      const data = await res.json();

      setCategories(data);

      sessionStorage.setItem(
        "categories",
        JSON.stringify(data)
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <>
      <Navbar />

      <section className="categories-page">

        <div className="container">

          <div className="categories-header">

            <span className="section-badge">
              Categories
            </span>

            <h1>
              Browse Categories
            </h1>

            <p>
              Discover products by category.
            </p>

            <input
              className="category-search"
              placeholder="Search category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="row g-4">

            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    className="col-md-6 col-lg-3"
                    key={i}
                  >
                    <CategorySkeletonPage />
                  </div>
                ))
              : filteredCategories
                  .slice(0, visible)
                  .map((category) => (
                    <div
                      className="col-md-6 col-lg-3"
                      key={category.slug}
                    >
                      <CategoryCard
                        category={category}
                      />
                    </div>
                  ))}

          </div>

          {!loading && (
            <div
              ref={loader}
              style={{ height: 40 }}
            />
          )}

        </div>

      </section>

      <Footer />
    </>
  );
}