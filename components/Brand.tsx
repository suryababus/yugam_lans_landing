import Link from "next/link";
import Image from "next/image";

export default function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Yugam Labs home">
      <Image className="brand-mark" src="/icon.svg" width={32} height={32} unoptimized alt="" />
      <span>YUGAM <strong>LABS</strong></span>
    </Link>
  );
}
