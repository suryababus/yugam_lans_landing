"use client";

import {
  MagnifyingGlass,
  Rocket,
  ChartLineUp,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";

export default function WhyChooseUs() {
  return (
    <section id="why" className="px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            Here&apos;s what you get when you build with us.
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg text-muted">
            Not just a product that works, but one that grows your business and
            puts you in front of more people.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column: tall discovery card + big stat card */}
          <div className="flex flex-col gap-8">
            <Reveal className="flex-1">
              <div className="flex h-full flex-col rounded-3xl bg-surface p-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <MagnifyingGlass size={22} weight="regular" aria-hidden />
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  Get found by more people
                </h3>
                <p className="mt-3 text-base text-muted">
                  Every page we ship is structured for search engines and AI
                  answer engines from day one, with clean markup, fast loads,
                  and schema that tells Google and ChatGPT exactly what you do.
                  You show up where your customers are already looking.
                </p>
                <div
                  className="mt-8 flex flex-1 items-end gap-3"
                  aria-hidden
                >
                  {[35, 55, 45, 70, 60, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-lg bg-accent/20"
                      style={{ height: `${h}%`, minHeight: `${h * 0.8}px` }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl bg-surface p-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <ChartLineUp size={22} weight="regular" aria-hidden />
                  </div>
                  <div>
                    <p className="text-5xl font-semibold tracking-tight">
                      3.2x
                    </p>
                    <p className="mt-3 text-base text-muted">
                      more inbound leads for clients within 90 days of
                      relaunching with us.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column: launch speed card + tall dark stat card */}
          <div className="flex flex-col gap-8">
            <Reveal delay={100}>
              <div className="rounded-3xl bg-surface p-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <Rocket size={22} weight="regular" aria-hidden />
                  </div>
                  <p className="text-xl font-semibold tracking-tight">
                    Launch in weeks, not months, and start earning while
                    competitors are still planning.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="flex-1">
              <div className="flex h-full flex-col justify-end rounded-3xl bg-foreground p-8 text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg">
                <p className="text-base text-white/70">Up to</p>
                <p className="mt-2 text-6xl font-semibold tracking-tight md:text-7xl">
                  2.4x faster
                </p>
                <p className="mt-3 text-lg text-white/70">
                  page loads than the average small business site. Visitors
                  stay, browse, and buy instead of bouncing to a competitor.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
