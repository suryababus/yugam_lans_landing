import Link from "next/link";
import Image from "next/image";
import {
  Browser,
  DeviceMobile,
  Circuitry,
  Cpu,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { projects, services } from "@/lib/studio";

export function ServiceRail() {
  const icons = [Browser, DeviceMobile, Circuitry, Cpu];
  return (
    <nav className="service-rail" id="services" aria-label="Explore services">
      {services.map((item, i) => {
        const Icon = icons[i];
        return (
          <Link href={"/services/" + item.slug} key={item.slug}>
            <Icon size={25} weight="regular" aria-hidden />
            {item.name}
            <ArrowUpRight size={14} className="rail-arrow" aria-hidden />
          </Link>
        );
      })}
    </nav>
  );
}

export function ProjectCards({ featured = false }: { featured?: boolean }) {
  return (
    <div className="work-grid">
      {(featured ? projects.slice(0, 2) : projects).map((p) => (
        <Link
          className={"work-card " + p.slug}
          key={p.slug}
          href={"/portfolio/" + p.slug}
        >
          <div className="work-art">
            <Image
              src={p.image}
              alt=""
              fill
              sizes="(max-width: 700px) 95vw, 48vw"
            />
            {!p.preview && <span className="cover-type">{p.name}</span>}
          </div>
          <div className="card-copy">
            <div>
              <p className="micro">
                {p.concept && "Studio concept / "}
                {p.category} / {p.industry}
              </p>
              <h3>{p.name}</h3>
            </div>
            <span className="round-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Intro({
  section,
  title,
  summary,
}: {
  section: string;
  title: string;
  summary: string;
}) {
  return (
    <div className="intro">
      <p className="eyebrow">
        <span className="signal" />
        {section}
      </p>
      <h1>{title}</h1>
      <p className="lead">{summary}</p>
    </div>
  );
}

export function ContactBand() {
  return (
    <aside className="contact-band" id="contact">
      <div>
        <p className="micro">Project inquiries</p>
        <h2>What are you building?</h2>
      </div>
      <Link href="/contact" className="button light">
        Start a project <span aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}

export function Breadcrumb({
  href,
  label,
  current,
}: {
  href: string;
  label: string;
  current: string;
}) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <Link href={href}>{label}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
