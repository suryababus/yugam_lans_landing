"use client";

import { useState } from "react";
import { CaretDown, CircleNotch, CheckCircle } from "@phosphor-icons/react";
import Reveal from "./Reveal";

const PROJECT_TYPES = [
  "Website",
  "Mobile app",
  "AI automation",
  "Embedded programming",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClasses =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-base transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!message.trim()) next.message = "Please tell us a little about your project.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="px-6 py-24 scroll-mt-24">
        <div className="mx-auto max-w-xl rounded-3xl bg-surface p-12 text-center">
          <CheckCircle size={48} weight="fill" className="mx-auto text-accent" aria-hidden />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Message received
          </h2>
          <p className="mt-3 text-base text-muted">
            Thanks, {name.trim().split(" ")[0]}. We reply to every inquiry
            within 1 business day at the address you gave us.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            Start a project
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg text-muted">
            Tell us what you want to build. We reply within 1 business day, and
            the first scoping conversation costs nothing.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="mt-12 flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClasses}
                placeholder="Anita Raghavan"
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClasses}
                placeholder="anita@company.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="projectType"
                className="mb-2 block text-sm font-semibold"
              >
                Project type
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className={`${inputClasses} appearance-none pr-10`}
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={16}
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={inputClasses}
                placeholder="What are you building, and when do you need it?"
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                We could not send your message. Please try again, or email us at{" "}
                <a href="mailto:contact@yugamlabs.in" className="underline">
                  contact@yugamlabs.in
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-3 py-2 text-base font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {status === "loading" && (
                <CircleNotch size={18} className="animate-spin" aria-hidden />
              )}
              {status === "loading" ? "Sending" : "Send inquiry"}
            </button>

            <p className="text-center text-sm text-muted">
              Prefer email? Write to{" "}
              <a
                href="mailto:contact@yugamlabs.in"
                className="font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                contact@yugamlabs.in
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
