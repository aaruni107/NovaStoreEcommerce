import ProductSkeleton from "../loading";
import CategoriesSkeleton from "./CategoriesSkeleton";
import HeroSkeleton from "./HeroSkeleton";

export default function HomeSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <CategoriesSkeleton />

      <section className="container py-5">
        <div className="row g-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <ProductSkeleton />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
