"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { faqs } from "@/lib/faqs";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            Questions, answered
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.q} delay={Math.min(i * 50, 200)}>
                <div className="rounded-2xl border border-black/10 bg-white">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-4 text-left text-base font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {faq.q}
                    <CaretDown
                      size={18}
                      aria-hidden
                      className={`shrink-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-4 text-base text-muted">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
