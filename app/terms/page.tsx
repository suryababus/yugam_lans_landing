import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of service — Yugam Labs",
  description: "Terms governing the use of the Yugam Labs website.",
};

export default function TermsPage() {
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
          Terms of service
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated September 2026</p>

        <div className="mt-8 flex flex-col gap-6 text-base text-muted">
          <p>
            This website is operated by Yugam Labs, Chennai, Tamil Nadu, India.
            By using it you agree to these terms.
          </p>
          <p>
            Content on this site is provided for general information about our
            services. It is not a binding offer. Project scope, pricing, and
            deliverables are defined in a written agreement signed by both
            parties before work begins.
          </p>
          <p>
            All trademarks, copy, and imagery on this site belong to their
            respective owners. You may not reproduce site content commercially
            without written permission.
          </p>
          <p>
            Questions about these terms can be sent to{" "}
            <a
              href="mailto:contact@yugamlabs.in"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              contact@yugamlabs.in
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
