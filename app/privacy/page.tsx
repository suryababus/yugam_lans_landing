import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy policy — Yugam Labs",
  description: "How Yugam Labs collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl flex-1 px-6 py-24">
        <Link
          href="/"
          className="text-sm font-semibold text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Back to home
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight">
          Privacy policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated September 2026</p>

        <div className="mt-8 flex flex-col gap-6 text-base text-muted">
          <p>
            Yugam Labs collects only the information you give us through the
            contact form on this site: your name, email address, project type,
            and message. We use it to reply to your inquiry and for no other
            purpose.
          </p>
          <p>
            We do not sell your data, share it with advertisers, or add you to
            a mailing list without your consent. Inquiry records are kept for
            up to 24 months and then deleted.
          </p>
          <p>
            This site does not use tracking cookies. Standard server logs
            (IP address, request time) are retained briefly for security and
            reliability.
          </p>
          <p>
            To request a copy of your data or ask us to delete it, email{" "}
            <a
              href="mailto:contact@yugamlabs.in"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              contact@yugamlabs.in
            </a>
            . We respond within 1 business day.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
