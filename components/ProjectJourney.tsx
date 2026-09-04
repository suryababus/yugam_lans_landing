"use client";

import { Check, Rocket } from "@phosphor-icons/react";
import { useInView } from "@/lib/useInView";
import Reveal from "./Reveal";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/* Step 1: chat bubbles popping in one by one */
function ChatVisual({ active }: { active: boolean }) {
  const bubbles = [
    {
      text: "We need a site that actually brings in customers.",
      ours: false,
      delay: 200,
    },
    {
      text: "Tell us who your customers are and what a win looks like.",
      ours: true,
      delay: 550,
    },
    { text: "Can we be live before March?", ours: false, delay: 900 },
  ];
  return (
    <div className="flex w-full max-w-sm flex-col gap-3" aria-hidden>
      {bubbles.map((b) => (
        <div
          key={b.text}
          className={`journey-fx max-w-[85%] rounded-2xl px-4 py-3 text-sm transition-all duration-700 ${EASE} ${
            b.ours ? "self-end bg-accent text-white" : "self-start bg-white/10"
          } ${active ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0"}`}
          style={{ transitionDelay: active ? `${b.delay}ms` : "0ms" }}
        >
          {b.text}
        </div>
      ))}
    </div>
  );
}

/* Step 2: a wireframe assembling inside a browser frame */
function DesignVisual({ active }: { active: boolean }) {
  const block = (extra: string, delay: number) => (
    <div
      className={`journey-fx rounded-lg bg-white/15 transition-all duration-700 ${EASE} ${extra} ${
        active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ transitionDelay: active ? `${delay}ms` : "0ms" }}
    />
  );
  return (
    <div
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4"
      aria-hidden
    >
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {block("h-4 w-1/3", 200)}
        {block("h-16 w-full !bg-accent/40", 450)}
        <div className="flex gap-2">
          {block("h-12 flex-1", 700)}
          {block("h-12 flex-1", 850)}
        </div>
        {block("h-4 w-1/2", 1000)}
      </div>
    </div>
  );
}

/* Step 3: a contract whose signature draws itself, then a check pops */
function AgreementVisual({ active }: { active: boolean }) {
  return (
    <div className="relative w-full max-w-xs" aria-hidden>
      <div className="rounded-2xl bg-white p-6 text-foreground shadow-lg">
        <p className="font-mono text-xs text-muted">Statement of work</p>
        <div className="mt-4 flex flex-col gap-2">
          <div className="h-2 w-full rounded-full bg-black/10" />
          <div className="h-2 w-5/6 rounded-full bg-black/10" />
          <div className="h-2 w-4/6 rounded-full bg-black/10" />
        </div>
        <div className="mt-6 border-t border-black/10 pt-3">
          <svg viewBox="0 0 200 48" className="h-12 w-full">
            <path
              d="M8 34 C 22 8, 34 8, 40 30 C 44 44, 52 42, 58 26 C 64 12, 72 14, 76 28 C 80 40, 90 38, 102 24 C 114 12, 124 30, 140 28 C 156 26, 168 22, 192 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={active ? 0 : 1}
              className={`journey-fx transition-all duration-[1400ms] ${EASE}`}
              style={{ transitionDelay: active ? "400ms" : "0ms" }}
            />
          </svg>
          <p className="mt-1 font-mono text-xs text-muted">
            Scope, price, and timeline, all in writing
          </p>
        </div>
      </div>
      <div
        className={`journey-fx absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-700 ${EASE} ${
          active ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ transitionDelay: active ? "1700ms" : "0ms" }}
      >
        <Check size={20} weight="bold" />
      </div>
    </div>
  );
}

/* Step 4: code lines typing themselves into an editor */
function BuildVisual({ active }: { active: boolean }) {
  const lines = [
    { width: "w-2/5", color: "bg-accent/70", delay: 200 },
    { width: "w-4/5", color: "bg-white/30", delay: 400 },
    { width: "w-3/5", color: "bg-white/30", delay: 600 },
    { width: "w-11/12", color: "bg-emerald-400/60", delay: 800 },
    { width: "w-1/2", color: "bg-white/30", delay: 1000 },
    { width: "w-3/4", color: "bg-accent/70", delay: 1200 },
  ];
  return (
    <div
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-5"
      aria-hidden
    >
      <p className="font-mono text-xs text-white/40">sprint 3 of 5</p>
      <div className="mt-3 flex flex-col gap-2.5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`journey-fx h-2 origin-left rounded-full transition-all duration-700 ${EASE} ${line.color} ${line.width} ${
              active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
            style={{ transitionDelay: active ? `${line.delay}ms` : "0ms" }}
          />
        ))}
      </div>
    </div>
  );
}

/* Step 5: rocket lifting off with a pulse ring and a live badge */
function LaunchVisual({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-5" aria-hidden>
      <div className="relative">
        <span
          className={`absolute inset-0 rounded-full bg-accent/60 ${active ? "chat-ping" : "opacity-0"}`}
        />
        <div
          className={`journey-fx relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white transition-all duration-700 ${EASE} ${
            active ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-75 opacity-0"
          }`}
          style={{ transitionDelay: active ? "200ms" : "0ms" }}
        >
          <Rocket size={36} weight="regular" />
        </div>
      </div>
      <div
        className={`journey-fx flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 transition-all duration-700 ${EASE} ${
          active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: active ? "700ms" : "0ms" }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-sm font-semibold">Your site is live</span>
      </div>
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "We talk it through",
    body: "A short call where we listen more than we pitch. You leave with a clear read on feasibility, budget range, and timeline before anything is signed.",
    Visual: ChatVisual,
  },
  {
    number: "02",
    title: "You see the design first",
    body: "We turn the conversation into a clickable prototype. You react to real screens, not a slide deck, and we iterate until it feels like yours.",
    Visual: DesignVisual,
  },
  {
    number: "03",
    title: "We put it in writing",
    body: "One agreement covering scope, price, and delivery dates. You sign knowing exactly what you get and when, with no surprise invoices later.",
    Visual: AgreementVisual,
  },
  {
    number: "04",
    title: "We build in the open",
    body: "Work ships in two week sprints, each ending with a live preview link. You watch the product grow instead of waiting for a big reveal.",
    Visual: BuildVisual,
  },
  {
    number: "05",
    title: "You launch and get seen",
    body: "We deploy, submit your site to search engines, and hand over the keys with documentation. Then we stay on call while the first customers roll in.",
    Visual: LaunchVisual,
  },
];

function JourneyStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const flip = index % 2 === 1;
  const isLast = index === steps.length - 1;

  return (
    <div ref={ref} className="grid grid-cols-[3rem_1fr] gap-6 md:grid-cols-[1fr_4rem_1fr] md:gap-8">
      {/* Timeline spine */}
      <div className="relative row-span-2 flex flex-col items-center md:order-2 md:col-start-2 md:row-span-1">
        <div
          className={`journey-fx z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-foreground font-mono text-xs transition-all duration-700 ${EASE} ${
            inView ? "scale-100 border-accent text-white opacity-100" : "scale-50 text-white/40 opacity-0"
          }`}
        >
          {step.number}
        </div>
        {!isLast && (
          <div className="relative mt-2 w-px flex-1 bg-white/10">
            <div
              className={`journey-fx absolute inset-0 origin-top bg-accent/60 transition-transform duration-1000 ${EASE} ${
                inView ? "scale-y-100" : "scale-y-0"
              }`}
              style={{ transitionDelay: inView ? "300ms" : "0ms" }}
            />
          </div>
        )}
      </div>

      {/* Copy */}
      <div
        className={`journey-fx pb-16 transition-all duration-700 ${EASE} md:pb-24 ${
          flip ? "md:order-3 md:col-start-3" : "md:order-1 md:col-start-1 md:text-right"
        } ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
        <p className="mt-3 text-base text-white/60">{step.body}</p>
      </div>

      {/* Animated visual */}
      <div
        className={`col-start-2 flex pb-16 md:col-auto md:pb-24 ${
          flip
            ? "md:order-1 md:col-start-1 md:justify-end"
            : "md:order-3 md:col-start-3 md:justify-start"
        } justify-start`}
      >
        <step.Visual active={inView} />
      </div>
    </div>
  );
}

export default function ProjectJourney() {
  return (
    <section className="bg-foreground px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            From first hello to launch day.
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg text-white/60">
            No mystery process. Here is exactly what happens after you reach
            out, in the order it happens.
          </p>
        </Reveal>

        <div className="mt-20">
          {steps.map((step, i) => (
            <JourneyStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
