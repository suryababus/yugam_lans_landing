import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yugamlabs.in"),
  title: "Yugam Labs — AI native software studio",
  description:
    "Yugam Labs is an AI native engineering studio in Chennai. One senior team designs and ships websites, mobile apps, AI automation, and embedded systems.",
  openGraph: {
    title: "Yugam Labs — AI native software studio",
    description:
      "One senior team designs and ships websites, mobile apps, AI automation, and embedded systems. From silicon to screen, accelerated by AI.",
    url: "https://yugamlabs.in",
    siteName: "Yugam Labs",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "A clean workspace with a laptop, representing Yugam Labs engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yugam Labs — AI native software studio",
    description:
      "Websites, mobile apps, AI automation, and embedded systems from one senior team in Chennai.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yugam Labs",
  url: "https://yugamlabs.in",
  email: "contact@yugamlabs.in",
  description:
    "AI native engineering studio delivering websites, mobile apps, AI automation, and embedded systems.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
