"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "@/styles/card.css";
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

interface Props {
  categories: Category[];
}

export default function Categories({ categories }: Props) {
  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <span className="text-primary fw-semibold text-uppercase small">
            Categories
          </span>

          <h2 className="display-5 fw-bold mt-2">Shop by Category</h2>

          <p className="text-secondary fs-5">
            Explore thousands of premium gadgets and accessories.
          </p>
        </div>

        <Link
          href="/categories"
          className="btn btn-outline-primary rounded-pill px-4"
        >
          View All
        </Link>
      </div>

      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-12 col-sm-6 col-lg-3" key={category.id}>
            <Link
              href={`/category/${category.slug}`}
              className="text-decoration-none"
            >
              <div className="category-card">
                <div className="category-image">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-fit-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="fw-bold mb-1 text-body">
                        {category.name}
                      </h5>

                      <p className="text-secondary mb-0">
                        {category.productCount} Products
                      </p>
                    </div>

                    <div className="category-arrow">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
