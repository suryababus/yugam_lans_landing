import Contact from "@/components/Contact";
import { Intro } from "@/components/StudioUI";
import { pageMeta } from "@/lib/metadata";
import { services } from "@/lib/studio";

export const metadata = pageMeta(
  "Start a software project",
  "Tell the Chennai team at Yugam Labs about your web app, mobile product, AI automation, or embedded project.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initial = services.find((s) => s.slug === service)?.name;
  return (
    <main id="main" className="wrap inner">
      <div className="contact-grid">
        <div>
          <Intro
            section="Contact the studio"
            title="Start a project."
            summary="Tell us who you’re building for, what you want to change, and any dates you’re working toward."
          />
          <a className="text-link" href="mailto:contact@yugamlabs.in">
            contact@yugamlabs.in ↗
          </a>
        </div>
        <Contact key={initial} initialService={initial} />
      </div>
    </main>
  );
}
