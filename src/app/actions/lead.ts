"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { createLead } from "@/lib/attio";
import { rateLimit } from "@/lib/rate-limit";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "company" | "message", string>
  >;
};

export const initialLeadState: LeadFormState = { status: "idle" };

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().max(160).optional(),
  message: z.string().trim().max(2000).optional(),
});

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: real users never fill this hidden field. Pretend success.
  const honeypot = formData.get("company_website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  // Rate limit: 5 submissions per IP per 10 minutes.
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000)) {
    return {
      status: "error",
      message: "Too many requests. Please try again in a little while.",
    };
  }

  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: LeadFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key as keyof typeof fieldErrors]) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    await createLead({
      ...parsed.data,
      source: "gimmir.com — founder review",
    });
    return { status: "success" };
  } catch (error) {
    console.error("Lead submission failed:", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please email us directly.",
    };
  }
}
