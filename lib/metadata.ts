import type { Metadata } from "next";
import { siteUrl } from "./studio";

export function pageMeta(
  title: string,
  description: string,
  path: string,
  image = "/studio/knot.webp",
): Metadata {
  const fullTitle = title + " | Yugam Labs";
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Yugam Labs",
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
