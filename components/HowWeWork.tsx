import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Honest scoping",
    body: "We tell you what the project actually costs and how long it takes, in writing, before anyone commits. AI assisted estimation lets us scope against 40+ past builds instead of gut feel.",
  },
  {
    number: "02",
    title: "Clickable prototypes",
    body: "You review a working prototype, not a slide deck. We generate design variants fast, iterate with you, and lock the direction before expensive engineering begins.",
  },
  {
    number: "03",
    title: "Two week cycles",
    body: "Every two weeks you get a live preview link with real progress. AI agents handle the boilerplate and regression tests so our engineers spend their hours on your hard problems.",
  },
  {
    number: "04",
    title: "Documented handover",
    body: "You receive the code, the infrastructure, and documentation your own team can actually work from. No lock in, no mystery boxes, no calls to us six months later just to change a label.",
  },
];

export default function HowWeWork() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            How we work
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg text-muted">
            The same four steps for every project, whether it is a landing page
            or a fleet of connected devices.
          </p>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.number}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <div className="h-full rounded-3xl bg-surface p-8">
                  <span className="font-mono text-sm text-muted">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
