"use client";

import { Review } from "@/types/product";

interface Props {
  reviews: Review[];
  reviewCount: number;
}

export default function ProductReviews({ reviews, reviewCount }: Props) {
  return (
    <section className="reviews-section">
      <h2 className="mb-5">Customer Reviews ({reviewCount})</h2>

      <div className="row g-4">
        {reviews.map((review, index) => (
          <div className="col-lg-6" key={index}>
            <div className="review-card">
              <div className="review-header">
                <div className="review-avatar">
                  {review.reviewerName.charAt(0)}
                </div>

                <div>
                  <h5>{review.reviewerName}</h5>

                  <small>{new Date(review.date).toLocaleDateString()}</small>
                </div>
              </div>

              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= review.rating ? "filled" : ""}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
