"use client";

import Image from "next/image";
import {
  Browser,
  DeviceMobile,
  Sparkle,
  Cpu,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";

const services = [
  {
    icon: Browser,
    title: "Websites",
    body: "Marketing sites, dashboards, and APIs that load fast and convert. Our AI assisted build cycles mean you see a working page in days, not weeks, and every release ships with tests already written.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    alt: "A designer working on a website layout on a laptop",
  },
  {
    icon: DeviceMobile,
    title: "Mobile apps",
    body: "Cross platform apps with native performance where it counts. We use AI agents to keep iOS and Android in lockstep, so one codebase covers both stores without the usual compromise.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    alt: "A person holding a smartphone running a mobile app",
  },
  {
    icon: Sparkle,
    title: "AI automation",
    body: "Custom agents, chat interfaces, and workflow automation built on frontier models. We turn the process that eats your team's afternoons into a system that runs while they sleep.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    alt: "A humanoid robot representing applied artificial intelligence",
  },
  {
    icon: Cpu,
    title: "Embedded programming",
    body: "Firmware for microcontrollers and IoT devices, from board bring up to over the air updates. The same team that writes your firmware writes your cloud, so nothing gets lost at the boundary.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    alt: "A close up of a circuit board with a microcontroller",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
            What we build
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg text-muted">
            Four disciplines, one team, in the order our clients need them most.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg">
                <div className="overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={1200}
                    height={800}
                    className="aspect-[3/2] w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
                    <service.icon size={22} weight="regular" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base text-muted">{service.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
