import { createHash } from "node:crypto";
import { isIP } from "node:net";

const windowMs = 15 * 60 * 1000;
const submissions: { email: string; client: string; time: number }[] = [];
let discordAvailableAt = 0;

export function pauseDiscord(seconds: number) {
  discordAvailableAt = Math.max(
    discordAvailableAt,
    Date.now() + seconds * 1000,
  );
}

// Synchronous reservations cover concurrent requests on the same server process.
export function reserveSubmission(
  email: string,
  headers: Headers,
  now = Date.now(),
) {
  while (submissions.length && submissions[0].time + windowMs <= now)
    submissions.shift();
  const digest = (value: string) =>
    createHash("sha256").update(value).digest("hex");
  const sender = digest(email.toLowerCase());
  const forwarded =
    (process.env.VERCEL === "1" || process.env.RAILWAY_ENVIRONMENT_ID) &&
    headers.get("x-real-ip");
  const client = forwarded && isIP(forwarded) ? digest(forwarded) : "shared";
  const sameEmail = submissions.filter((entry) => entry.email === sender);
  const sameClient = submissions.filter((entry) => entry.client === client);
  const retryAt = Math.max(
    discordAvailableAt,
    sameEmail.length >= 3 ? sameEmail[0].time + windowMs : 0,
    client !== "shared" && sameClient.length >= 6
      ? sameClient[0].time + windowMs
      : 0,
    submissions.length >= 30 ? submissions[0].time + windowMs : 0,
  );
  if (retryAt > now) return Math.ceil((retryAt - now) / 1000);
  submissions.push({ email: sender, client, time: now });
  return 0;
}
