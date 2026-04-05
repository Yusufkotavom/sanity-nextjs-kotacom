import ReviewCard from "@/components/ui/review-card";
import StarRating from "@/components/ui/star-rating";
import type { AggregateRatingData, ReviewItemData } from "@/lib/seo-jsonld";

interface ReviewsSectionProps {
  reviews: ReviewItemData[];
  aggregateRating?: AggregateRatingData;
  title?: string;
}

export default function ReviewsSection({
  reviews,
  aggregateRating,
  title = "Ulasan Pelanggan",
}: ReviewsSectionProps) {
  if (!reviews?.length && !aggregateRating?.ratingValue) return null;

  return (
    <section className="mt-12 border-t border-border/40 pt-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold lg:text-3xl">{title}</h2>
        {aggregateRating?.ratingValue && (
          <div className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-2.5">
            <StarRating
              rating={aggregateRating.ratingValue}
              size="lg"
              showValue
            />
            <span className="text-sm text-foreground/60">
              ({aggregateRating.reviewCount} ulasan)
            </span>
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <ReviewCard
              key={review.datePublished || idx}
              reviewerName={review.reviewerName || "Anonim"}
              reviewerRole={review.reviewerRole}
              reviewerImage={review.reviewerImage}
              rating={review.rating || 5}
              reviewBody={review.reviewBody}
              datePublished={review.datePublished}
              source={review.source}
              sourceUrl={review.sourceUrl}
              verified={review.verified}
            />
          ))}
        </div>
      )}
    </section>
  );
}
