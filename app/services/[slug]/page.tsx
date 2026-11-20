import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, Intro } from "@/components/StudioUI";
import { services, projects, siteUrl } from "@/lib/studio";
import { pageMeta } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  return pageMeta(s.title + " in Chennai", s.summary, "/services/" + s.slug);
}
export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  const p = projects.find((p) => p.slug === s.project);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.name,
    description: s.summary,
    url: siteUrl + "/services/" + s.slug,
    provider: { "@id": siteUrl + "/#organization" },
  };
  return (
    <main id="main" className="wrap inner">
      <Breadcrumb href="/services" label="Services" current={s.name} />
      <Intro
        section="Engineering services"
        title={s.title + "."}
        summary={s.summary}
      />
      <div className="detail-grid">
        <article className="reading">
          <h2>Where it fits</h2>
          <p>{s.fit}</p>
          <h2>What you receive</h2>
          <ul>
            {s.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>{s.question}</h2>
          <p>{s.answer}</p>
          {p && (
            <Link className="text-link" href={"/portfolio/" + p.slug}>
              Explore {p.name} <span aria-hidden="true">↗</span>
            </Link>
          )}
        </article>
        <aside className="brief-panel">
          <p className="micro">Project brief</p>
          <h2>Where to start</h2>
          <p>{s.brief}</p>
          <Link className="button dark" href={"/contact?service=" + s.slug}>
            Discuss your project <span aria-hidden="true">↗</span>
          </Link>
          <small>{s.stack}</small>
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
