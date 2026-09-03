"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main"
        className="mx-auto mt-6 flex w-max items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2 py-2 shadow-sm backdrop-blur-xl"
      >
        <Link
          href="/"
          aria-current="page"
          className="rounded-full px-3 py-2 text-sm font-semibold tracking-tight transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Yugam Labs
        </Link>

        <ul className="hidden items-center md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 hover:text-foreground active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-accent px-3 py-2 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:inline-block"
        >
          Start a project
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
        >
          <span
            className={`absolute h-0.5 w-4 rounded-full bg-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 rounded-full bg-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Full screen mobile overlay */}
      <div
        className={`fixed inset-0 -z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {links.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: open ? "300ms" : "0ms" }}
          >
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full bg-accent px-4 py-3 text-base font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start a project
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
