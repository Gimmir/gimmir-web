import { BookingCta } from "@/components/shared/booking-cta";
import { BOOKINGS } from "@/lib/booking";
import { hostNames } from "@/lib/founders";

const cost = BOOKINGS.costCheck;
const review = BOOKINGS.founderReview;

/**
 * Both signed calls, for pages that serve operators and product founders
 * alike: each visitor picks the call that's theirs.
 */
export function SplitBooking({ placement }: { placement: string }) {
  return (
    <div className="flex shrink-0 flex-col gap-3.5">
      <div className="flex flex-col gap-3 sm:items-start">
        <BookingCta booking="costCheck" placement={placement} />
        <BookingCta
          booking="founderReview"
          placement={placement}
          variant="outline"
        />
      </div>
      <p className="max-w-[44ch] text-sm text-faint">
        Operators: {cost.minutes} minutes with {hostNames(cost.hosts)}. Product
        and health founders: {review.minutes} minutes with{" "}
        {hostNames(review.hosts)}. Free, no pitch.
      </p>
    </div>
  );
}
