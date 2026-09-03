"use client";

import { useEffect, useRef, useState } from "react";

const TAGLINE =
  "We are AI native. Every line we ship is designed by senior engineers and accelerated by machine intelligence.";

export default function TaglineReveal() {
  const words = TAGLINE.split(" ");
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveCount(words.length);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = container.getBoundingClientRect();
        // Words activate as the block travels from 85% to 35% of viewport height
        const start = window.innerHeight * 0.85;
        const end = window.innerHeight * 0.35;
        const progress = Math.min(
          1,
          Math.max(0, (start - rect.top) / (start - end)),
        );
        setActiveCount(Math.round(progress * words.length));
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words.length]);

  return (
    <section className="bg-surface px-6 py-32">
      <h2
        ref={containerRef}
        className="mx-auto max-w-[680px] text-center text-4xl font-semibold tracking-tight md:text-5xl"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={`tagline-word ${i < activeCount ? "is-active" : ""}`}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
    </section>
  );
}
