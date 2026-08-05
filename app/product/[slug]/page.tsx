"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Link from "next/link";
import { ChevronRight } from "react-bootstrap-icons";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";

import "@/styles/product.css";
import ProductPageSkeleton from "@/components/loading/skeleton/product/ProductPageSkeleton";
import ProductReviews from "@/components/product/ProuctReview";

export default function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const cachedKey = "products-cache";
      const cachedData = sessionStorage.getItem(cachedKey);
      let data;
      if (cachedData) {
        data = JSON.parse(cachedData);
        const found = data.find((item: any) => item.slug === slug);
        setProduct(found);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <ProductPageSkeleton />
        <Footer />
      </>
    );
  }

  if (!product)
    return (
      <>
        <Navbar />
        <div className="container py-5">Product not found.</div>
      </>
    );

  return (
    <>
      <Navbar />

      <main className="product-page">
        <div className="container">
          {/* Breadcrumb */}

          <nav className="product-breadcrumb">
            <Link href="/">Home</Link>

            <ChevronRight className="breadcrumb-icon" />

            <Link href={`/category/${product.category}`}>
              {product.category}
            </Link>

            <ChevronRight className="breadcrumb-icon" />

            <span className="current-page">{product.name}</span>
          </nav>

          <div className="row g-5 align-items-start">
            <div className="col-lg-6">
              <ProductGallery images={product.images} />
            </div>

            <div className="col-lg-6">
              <ProductInfo product={product} />
            </div>
          </div>
          <ProductReviews
            reviews={product.reviews}
            reviewCount={product.reviewCount}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
