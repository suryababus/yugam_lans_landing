"use client";
import { useRef, useState } from "react";
import { services } from "@/lib/studio";

export default function Contact({
  initialService,
}: {
  initialService?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const pending = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const fields = new FormData(event.currentTarget);
    pending.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fields)),
      });
      if (res.status === 429) {
        const minutes = Math.max(
          1,
          Math.ceil(Number(res.headers.get("Retry-After") || 60) / 60),
        );
        setFeedback(
          `Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
        );
        setStatus("error");
        return;
      }
      const result = await res.json();
      if (res.ok && result.sent === true) setStatus("sent");
      else {
        setFeedback(result.error || "We couldn’t confirm delivery.");
        setStatus("error");
      }
    } catch {
      setFeedback(
        "We couldn’t confirm delivery. Please check your connection.",
      );
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }
  if (status === "sent")
    return (
      <div className="brief-panel" role="status">
        <h2>Message received.</h2>
        <p>
          Thanks for the brief. We’ll reply to the email address you shared.
        </p>
      </div>
    );
  return (
    <form onSubmit={submit} className="brief-form">
      <div hidden aria-hidden="true">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label>
        Your name
        <input name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label>
        Project type
        <select
          name="project_type"
          defaultValue={initialService ?? ""}
          required
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
          <option>Still exploring</option>
        </select>
      </label>
      <label>
        Project brief
        <textarea
          name="message"
          rows={4}
          required
          maxLength={4000}
          placeholder="What would you like to build?"
        />
      </label>
      <button className="button dark" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send inquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      {status === "error" && (
        <p role="alert">
          {feedback} You can also email{" "}
          <a href="mailto:contact@yugamlabs.in">contact@yugamlabs.in</a>.
        </p>
      )}
    </form>
  );
}
