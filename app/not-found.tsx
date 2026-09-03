import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 bg-gradient-to-r from-black to-[#666666] bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
        This page shipped without us
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-4 py-3 text-base font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
