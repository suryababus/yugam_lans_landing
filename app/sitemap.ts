import type { MetadataRoute } from "next";
import { services, projects, siteUrl } from "@/lib/studio";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/services",
    "/portfolio",
    "/studio",
    "/contact",
    "/privacy",
    "/terms",
    ...services.map((s) => "/services/" + s.slug),
    ...projects.map((p) => "/portfolio/" + p.slug),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
