"use client";

import Link from "next/link";
import { ArrowRight } from "react-bootstrap-icons";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface Props {
  category: Category;
}

const gradients = [
  "linear-gradient(135deg,#3B82F6,#2563EB)",
  "linear-gradient(135deg,#8B5CF6,#6D28D9)",
  "linear-gradient(135deg,#EC4899,#DB2777)",
  "linear-gradient(135deg,#10B981,#059669)",
  "linear-gradient(135deg,#F59E0B,#D97706)",
  "linear-gradient(135deg,#EF4444,#DC2626)",
];

export default function CategoryCard({ category }: Props) {
  const bg = gradients[category.name.length % gradients.length];

  return (
    <Link href={`/category/${category.slug}`} className="category-card">
      <div className="category-icon" style={{ background: bg }}>
        {category.name.charAt(0).toUpperCase()}
      </div>

      <h4>{category.name}</h4>

      <p>Explore premium {category.name.toLowerCase()}</p>

      <span className="browse-btn">
        Browse
        <ArrowRight />
      </span>
    </Link>
  );
}
