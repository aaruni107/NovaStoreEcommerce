"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export default function CategoryCard({
  name,
  slug,
  image,
  productCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group overflow-hidden rounded-4 bg-body-tertiary text-decoration-none"
    >
      <div className="position-relative p-4">
        <Image
          src={image}
          alt={name}
          width={220}
          height={220}
          className="img-fluid mx-auto d-block transition"
        />
      </div>

      <div className="px-4 pb-4">
        <h5 className="fw-semibold text-body mb-1">{name}</h5>

        <small className="text-secondary">{productCount} Products</small>
      </div>
    </Link>
  );
}
