export default function CategoriesSkeleton() {
  return (
    <section className="container py-5">
      <div className="skeleton skeleton-heading mb-5"></div>

      <div className="row g-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="category-card">
              <div className="skeleton category-image-skeleton"></div>

              <div className="p-4">
                <div className="skeleton skeleton-title mb-3"></div>

                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
