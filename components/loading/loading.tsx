export default function ProductSkeleton() {
  return (
    <div className="product-card">
      <div className="skeleton skeleton-badge"></div>

      <div className="skeleton skeleton-circle wishlist-skeleton"></div>

      <div className="product-image d-flex justify-content-center align-items-center">
        <div className="skeleton skeleton-image"></div>
      </div>

      <div className="product-body">
        <div className="skeleton skeleton-brand mb-3"></div>

        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-title short mt-2"></div>

        <div className="skeleton skeleton-rating mt-4"></div>

        <div className="d-flex gap-3 mt-4">
          <div className="skeleton skeleton-price"></div>

          <div className="skeleton skeleton-old-price"></div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <div className="skeleton skeleton-button flex-grow-1"></div>

          <div className="skeleton skeleton-circle"></div>
        </div>
      </div>
    </div>
  );
}
