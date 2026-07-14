import "server-only";

export type Lead = {
  name: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
};

const ATTIO_BASE = "https://api.attio.com/v2";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  const first = parts[0] ?? full;
  const last = parts.slice(1).join(" ");
  return { first_name: first, last_name: last, full_name: full };
}

async function attioFetch(
  path: string,
  apiKey: string,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch(`${ATTIO_BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Upserts the lead as a Person (matched on email) and attaches a Note with
 * the company, message and source. No-op when ATTIO_API_KEY is unset.
 */
export async function createLead(lead: Lead): Promise<void> {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) {
    console.warn(
      `[attio] ATTIO_API_KEY not set — lead from ${lead.email} was not forwarded.`,
    );
    return;
  }

  // 1. Upsert the person, matching on email.
  const personRes = await attioFetch(
    "/objects/people/records?matching_attribute=email_addresses",
    apiKey,
    {
      method: "PUT",
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [lead.email],
            name: [splitName(lead.name)],
          },
        },
      }),
    },
  );

  if (!personRes.ok) {
    const detail = await personRes.text().catch(() => "");
    throw new Error(`Attio person upsert failed (${personRes.status}): ${detail}`);
  }

  const person = (await personRes.json()) as {
    data?: { id?: { record_id?: string } };
  };
  const recordId = person.data?.id?.record_id;
  if (!recordId) throw new Error("Attio person upsert returned no record id");

  // 2. Attach a note with the rest of the submission.
  const contentLines = [
    `Source: ${lead.source}`,
    lead.company ? `Company: ${lead.company}` : null,
    "",
    "Message:",
    lead.message || "(none provided)",
  ].filter((line) => line !== null);

  const noteRes = await attioFetch("/notes", apiKey, {
    method: "POST",
    body: JSON.stringify({
      data: {
        parent_object: "people",
        parent_record_id: recordId,
        title: "Founder review request — gimmir.com",
        format: "plaintext",
        content: contentLines.join("\n"),
      },
    }),
  });

  if (!noteRes.ok) {
    const detail = await noteRes.text().catch(() => "");
    // Person is captured; a failed note shouldn't fail the whole submission.
    console.error(`Attio note failed (${noteRes.status}): ${detail}`);
  }
}
