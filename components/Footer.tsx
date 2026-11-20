import Link from "next/link";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <Brand />
          <p>Product engineering studio · Chennai, India</p>
        </div>
        <nav aria-label="Footer">
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
