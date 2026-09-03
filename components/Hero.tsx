import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-6 pt-40 pb-20 text-center md:pt-48">
      <div className="mx-auto max-w-[680px]">
        <h1 className="bg-gradient-to-r from-black to-[#666666] bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-6xl">
          Built by people.
          <br />
          Accelerated by AI.
        </h1>
        <p className="mx-auto mt-6 max-w-[680px] text-lg text-muted md:text-xl">
          Yugam Labs is an AI native engineering studio in Chennai. One senior
          team designs and ships websites, mobile apps, AI automation, and
          embedded systems, from silicon to screen.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-3 text-base font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start a project
          </a>
          <p className="text-sm text-muted">
            40+ products shipped · replies within 1 business day
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=2000&q=80"
          alt="A laptop showing code on a clean desk, the kind of workspace where Yugam Labs products are built"
          width={2000}
          height={1333}
          priority
          className="w-full rounded-3xl object-cover shadow-xl"
        />
      </div>
    </section>
  );
}
