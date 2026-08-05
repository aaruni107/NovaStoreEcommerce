export default function ProductPageSkeleton() {
  return (
    <section className="product-page">
      <div className="container">
        <div className="skeleton skeleton-breadcrumb mb-5"></div>

        <div className="row g-5">
          {/* Gallery */}

          <div className="col-lg-6">
            <div className="product-gallery">
              <div className="gallery-thumbnails">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton skeleton-thumb" />
                ))}
              </div>

              <div className="gallery-main">
                <div className="skeleton skeleton-main-image"></div>
              </div>
            </div>
          </div>

          {/* Product Info */}

          <div className="col-lg-6">
            <div className="skeleton skeleton-brand mb-3"></div>

            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-title short mt-3"></div>

            <div className="skeleton skeleton-rating mt-4"></div>

            <div className="d-flex gap-3 mt-4">
              <div className="skeleton skeleton-price"></div>

              <div className="skeleton skeleton-old-price"></div>
            </div>

            <div className="skeleton skeleton-stock mt-4"></div>

            <div className="skeleton skeleton-text mt-4"></div>

            <div className="skeleton skeleton-text w-75 mt-2"></div>

            <div className="skeleton skeleton-text w-50 mt-2"></div>

            <div className="skeleton skeleton-qty mt-5"></div>

            <div className="d-flex gap-3 mt-4">
              <div className="skeleton skeleton-button flex-grow-1"></div>

              <div className="skeleton skeleton-button flex-grow-1"></div>

              <div className="skeleton skeleton-circle"></div>
            </div>

            <div className="mt-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton skeleton-feature mb-3"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
