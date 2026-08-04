export default function HeroSkeleton() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <div className="skeleton skeleton-badge mb-4"></div>

            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-title w-75 mt-3"></div>

            <div className="skeleton skeleton-text mt-5"></div>
            <div className="skeleton skeleton-text w-50 mt-2"></div>

            <div className="d-flex gap-3 mt-5">
              <div className="skeleton skeleton-btn"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-skeleton skeleton"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
