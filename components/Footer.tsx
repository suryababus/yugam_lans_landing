import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-surface px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <p className="text-base font-semibold tracking-tight">Yugam Labs</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            AI native software studio. Chennai, Tamil Nadu, India.
          </p>
          <a
            href="mailto:contact@yugamlabs.in"
            className="mt-3 inline-block text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            contact@yugamlabs.in
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-12">
          <ul className="flex flex-col gap-3 text-sm">
            <li className="font-semibold">Site</li>
            <li>
              <a href="/#services" className="text-muted hover:text-foreground">
                Services
              </a>
            </li>
            <li>
              <a href="/#work" className="text-muted hover:text-foreground">
                Work
              </a>
            </li>
            <li>
              <a href="/#about" className="text-muted hover:text-foreground">
                About
              </a>
            </li>
            <li>
              <a href="/#contact" className="text-muted hover:text-foreground">
                Contact
              </a>
            </li>
          </ul>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="font-semibold">Legal</li>
            <li>
              <Link href="/privacy" className="text-muted hover:text-foreground">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted hover:text-foreground">
                Terms of service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-5xl text-sm text-muted">
        © {new Date().getFullYear()} Yugam Labs. All rights reserved.
      </p>
    </footer>
  );
}
