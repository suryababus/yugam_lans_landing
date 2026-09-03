import Reveal from "./Reveal";

const stats = [
  { value: "40+", label: "products shipped to production" },
  { value: "8 yr", label: "average engineer experience" },
  { value: "1 day", label: "to hear back on any inquiry" },
];

export default function Stats() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 text-center md:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100}>
            <p className="text-5xl font-semibold tracking-tight">{stat.value}</p>
            <p className="mt-3 text-base text-muted">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
