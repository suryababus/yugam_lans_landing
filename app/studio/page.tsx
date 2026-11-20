import { ContactBand, Intro } from "@/components/StudioUI";
import { faqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { registeredName } from "@/lib/studio";

export const metadata = pageMeta(
  "Our Chennai product engineering studio",
  "Meet Yugam Labs and see how we scope, prototype, build, and hand over web, mobile, and automation projects.",
  "/studio",
);
const steps = [
  [
    "Scope the first release",
    "We work through who will use the product, what they need to do, and what already exists. You receive a written scope and estimate.",
  ],
  [
    "Try the prototype",
    "Click through the core journey with us. This is where we settle the product direction and test the assumptions behind it.",
  ],
  [
    "Review working software",
    "Every two weeks, a preview gives your team something concrete to try. Feedback goes into the next build.",
  ],
  [
    "Take ownership",
    "At handover you receive the source, infrastructure details, and documentation. We walk your team through the release and support options.",
  ],
];
export default function Studio() {
  return (
    <main id="main" className="wrap inner">
      <Intro
        section="The studio / Chennai, India"
        title="A small team, from idea to release."
        summary="Yugam Labs is an independent engineering studio based in Chennai, Tamil Nadu. We work directly with founders and product teams on software that connects people, workflows, and devices."
      />
      <section className="reading wide">
        <h2>Company details</h2>
        <p>We operate as {registeredName}. Our studio is in Chennai, Tamil Nadu, and our registered office is in Cheyyar. For project inquiries, write to <a className="underline" href="mailto:contact@yugamlabs.in">contact@yugamlabs.in</a>.</p>
        <h2>How we work</h2>
        <ol className="steps">
          {steps.map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <h2>Working with us</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
      <ContactBand />
    </main>
  );
}
