"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (images?.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="gallery-main d-flex justify-content-center align-items-center">
        <p>No Image Available</p>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail-btn ${
              selectedImage === image ? "active" : ""
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Product ${index + 1}`}
              width={70}
              height={70}
            />
          </button>
        ))}
      </div>

      <div className="gallery-main">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Product Image"
            fill
            priority
            className="gallery-image"
          />
        )}
      </div>
    </div>
  );
}
