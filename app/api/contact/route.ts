import { request as httpsRequest } from "node:https";
import { services } from "@/lib/studio";
import { pauseDiscord, reserveSubmission } from "@/lib/contact-rate-limit";

const projectTypes = new Set([
  ...services.map((service) => service.name),
  "Still exploring",
]);
const maxBytes = 32 * 1024;

function error(message: string, status: number, retryAfter?: number) {
  return Response.json(
    { error: message },
    {
      status,
      headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
    },
  );
}

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > maxBytes)
    throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > maxBytes) {
        await reader.cancel();
        throw new RangeError();
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } finally {
    reader.releaseLock();
  }
}

// Use the server transport directly so framework fetch tracing never records the webhook URL.
function sendToDiscord(url: URL, payload: object) {
  return new Promise<{ status: number; retryAfter: number }>(
    (resolve, reject) => {
      const req = httpsRequest(
        url,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(10000),
        },
        (res) => {
          res.resume();
          res.on("error", reject);
          res.on("end", () =>
            resolve({
              status: res.statusCode ?? 502,
              retryAfter: Math.max(
                1,
                Math.ceil(Number(res.headers["retry-after"]) || 60),
              ),
            }),
          );
        },
      );
      req.on("error", reject);
      req.end(JSON.stringify(payload));
    },
  );
}

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site")
    return error("Please use the form on our website.", 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return error("Expected a JSON form submission.", 415);

  let data;
  try {
    data = await readBody(request);
  } catch (e) {
    return e instanceof RangeError
      ? error("The inquiry is too large.", 413)
      : error("Invalid form data.", 400);
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return error("Invalid form data.", 400);
  const fields = data as Record<string, unknown>;
  if (fields.company_website) return error("Invalid form data.", 400);
  const field = (key: string) =>
    typeof fields[key] === "string" ? fields[key].trim() : "";
  const name = field("name"),
    email = field("email"),
    project = field("project_type"),
    message = field("message");
  if (
    !name ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !projectTypes.has(project) ||
    !message ||
    message.length > 4000
  )
    return error("Check your name, email, project type, and brief.", 400);

  const configured = process.env.DISCORD_CONTACT_WEBHOOK_URL ?? "";
  if (
    !/^https:\/\/discord\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+$/.test(
      configured,
    )
  )
    return error("Inquiry delivery is unavailable.", 503);
  const wait = reserveSubmission(email, request.headers);
  if (wait)
    return error("Please wait before sending another inquiry.", 429, wait);
  const webhook = new URL(configured);
  webhook.searchParams.set("wait", "true");
  try {
    const result = await sendToDiscord(webhook, {
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "New Yugam Labs project inquiry",
          color: 0x6545cb,
          description: message,
          fields: [
            { name: "Name", value: name },
            { name: "Reply email", value: email },
            { name: "Project type", value: project },
          ],
        },
      ],
    });
    if (result.status === 429) {
      pauseDiscord(result.retryAfter);
      return error(
        "Delivery is busy. Please try again shortly.",
        429,
        result.retryAfter,
      );
    }
    if (result.status === 200) return Response.json({ sent: true });
  } catch {
    // Network failures must not expose the credential-bearing URL to logs or clients.
  }
  return error(
    "We couldn’t confirm delivery. Please try again later or email the studio.",
    502,
  );
}
