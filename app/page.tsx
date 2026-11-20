import Image from "next/image";
import Link from "next/link";
import { Crosshair } from "@phosphor-icons/react/dist/ssr";
import { ContactBand, ProjectCards, ServiceRail } from "@/components/StudioUI";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Web app, mobile app & AI automation studio in Chennai",
  "Yugam Labs designs and builds custom web applications, mobile apps, AI workflows, and connected devices. Explore our portfolio and discuss your project.",
  "/",
);

export default function Home() {
  return (
    <main id="main" className="wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="signal" />
            Independent engineering studio
          </p>
          <h1>
            Ideas into
            <br />
            <em>products.</em>
          </h1>
          <p className="lead">
            We design and build web apps, mobile products, and AI automations
            for teams ready to bring an idea to life.
          </p>
          <div className="actions">
            <Link href="/contact" className="button dark">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/portfolio" className="text-link">
              Explore our work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <figure className="hero-art">
          <Image
            src="/studio/knot.webp"
            alt="A continuous trefoil knot sculpted from layers of violet metal"
            fill
            sizes="(max-width: 760px) 95vw, 49vw"
            preload
          />
          <span className="art-corner top" aria-hidden="true">
            +
          </span>
          <span className="art-corner bottom" aria-hidden="true">
            +
          </span>
          <figcaption>
            <Crosshair size={14} aria-hidden /> Form study <b>/</b> Trefoil knot
          </figcaption>
        </figure>
      </section>
      <ServiceRail />
      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="signal" />
              Portfolio
            </p>
            <h2>
              Selected work<span>.</span>
            </h2>
          </div>
          <Link className="text-link" href="/portfolio">
            View portfolio <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ProjectCards featured />
      </section>
      <ContactBand />
    </main>
  );
}
