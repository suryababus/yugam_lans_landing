import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "They told us in week one that half our feature list could wait until after launch. That honesty saved us three months and a lot of money, and the launch went out on the date they promised.",
    role: "Founder, logistics startup",
  },
  {
    quote:
      "Our product needed firmware, a mobile app, and a cloud dashboard. With Yugam there was no blame passing between vendors when something broke, because it was one team owning all three layers.",
    role: "CTO, connected devices company",
  },
  {
    quote:
      "The handover was the best I have seen. Our in house team picked up the codebase in under a week because the documentation described decisions, not just endpoints.",
    role: "Engineering manager, fintech",
  },
];

export default function Testimonials() {
  return (
    <section id="work" className="bg-surface px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            What clients say
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg text-muted">
            Proof from the people who shipped with us.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.role} delay={i * 100} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-white p-8">
                <blockquote className="text-base text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-black/10 pt-4">
                  <p className="text-sm font-semibold">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
