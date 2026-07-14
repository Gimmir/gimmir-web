import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

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

    // Revalidate everything tagged with this document type.
    revalidateTag(body._type, "max");

    // Plus the slug-specific tag for case studies.
    if (body._type === "caseStudy" && body.slug) {
      revalidateTag(`caseStudy:${body.slug}`, "max");
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidate webhook error:", error);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
