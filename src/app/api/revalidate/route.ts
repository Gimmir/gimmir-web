import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

/**
 * Sanity publish webhook → instant cache invalidation.
 *
 * Content is fetched via `defineLive`, whose cache entries are keyed by opaque
 * `sanity:*` sync tags — so type-based `revalidateTag` can't reach them.
 * Content edits are rare and every page shares the layout-level settings /
 * navigation / founder documents, so the simplest correct move is to expire
 * the whole route cache on any publish.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request: missing _type", { status: 400 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug ?? null,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidate webhook error:", error);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
