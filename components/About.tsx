import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 scroll-mt-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            A senior team in Chennai
          </h2>
          <p className="mt-6 text-lg text-muted">
            Yugam Labs is a small studio of engineers with 8 years of average
            experience, based in Chennai, Tamil Nadu. We were early adopters of
            AI assisted development, and it shows in how we build: our people
            make the decisions, and machine intelligence handles the repetition.
          </p>
          <p className="mt-4 text-lg text-muted">
            Because one team covers everything from firmware to frontend, your
            project never stalls at a vendor boundary. The person who wrote your
            device driver can read your API logs.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Engineers collaborating around laptops at a shared table"
            width={1200}
            height={800}
            className="aspect-[3/2] w-full rounded-3xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
