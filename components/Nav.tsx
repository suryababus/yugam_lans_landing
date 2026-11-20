"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Brand from "./Brand";

const pages = [
  ["/services", "Services"],
  ["/portfolio", "Work"],
  ["/studio", "Studio"],
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="wrap header-row" onClick={() => setOpen(false)}>
        <Brand />
        <nav
          className={open ? "site-nav is-open" : "site-nav"}
          id="primary-nav"
          aria-label="Main navigation"
        >
          {pages.map(([href, label]) => (
            <Link
              href={href}
              key={href}
              aria-current={path === href ? "page" : undefined}
              className={path.startsWith(href) ? "active" : ""}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button dark header-cta" href="/contact">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
        <button
          type="button"
          ref={toggle}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
