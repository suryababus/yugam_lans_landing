import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb, ContactBand, Intro } from "@/components/StudioUI";
import { projects, services } from "@/lib/studio";
import { pageMeta } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const p = getProject((await params).slug);
  return pageMeta(
    p.name + " – " + p.category + (p.concept ? " concept" : " portfolio"),
    p.summary,
    "/portfolio/" + p.slug,
    p.image,
  );
}
export default async function Project({ params }: Props) {
  const p = getProject((await params).slug);
  const service = services.find((s) => s.slug === p.service)!;
  return (
    <main id="main" className="wrap inner">
      <Breadcrumb href="/portfolio" label="Portfolio" current={p.name} />
      <div className="project-lead">
        <Intro
          section={(p.concept ? "Studio concept / " : "") + p.category + " / " + p.industry}
          title={p.name + "."}
          summary={p.summary}
        />
        <div className="case-image">
          <Image
            src={p.image}
            alt=""
            fill
            sizes="(max-width: 760px) 95vw, 40vw"
          />
        </div>
      </div>
      <div className="detail-grid">
        <article className="reading">
          <h2>{p.concept ? "The idea" : "The product"}</h2>
          <p>{p.detail}</p>
          <h2>{p.concept ? "How it would work" : "Inside the build"}</h2>
          <ul>
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </article>
        <aside className="brief-panel">
          <p className="micro">Engineering notes</p>
          <h2>{p.concept ? "Proposed technology" : "Technology"}</h2>
          <p>{p.tech}</p>
          {p.preview && (
            <a className="text-link" href={p.preview}>Open website preview ↗</a>
          )}
          {(p.website || p.repo) && (
            <a className="text-link" href={p.website ?? p.repo}>
              {p.website ? "Visit " + p.name : "View public source"} ↗
            </a>
          )}
          <Link className="text-link" href={"/services/" + p.service}>
            {service.title} →
          </Link>
        </aside>
      </div>
      <ContactBand />
    </main>
  );
}
