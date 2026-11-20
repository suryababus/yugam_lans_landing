import Link from "next/link";
import { ContactBand, Intro } from "@/components/StudioUI";
import { pageMeta } from "@/lib/metadata";
import { services } from "@/lib/studio";

export const metadata = pageMeta(
  "Software development services in Chennai",
  "Explore custom web application development, iOS and Android apps, AI workflow automation, and embedded systems engineering from Yugam Labs.",
  "/services",
);
export default function Services() {
  return (
    <main id="main" className="wrap inner">
      <Intro
        section="Services"
        title="What we build."
        summary="Choose the discipline that fits your project. When a product spans an app, a device, and a workflow, one team can design the connections."
      />
      <div className="listing">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={"/services/" + s.slug}
            className="listing-row"
          >
            <h2>{s.name}</h2>
            <p>{s.summary}</p>
            <span className="round-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
      <ContactBand />
    </main>
  );
}
