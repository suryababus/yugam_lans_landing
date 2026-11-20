import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { registeredName, siteUrl } from "@/lib/studio";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yugam Labs",
  description: "Product engineering studio in Chennai, India.",
};
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": siteUrl + "/#organization",
  name: "Yugam Labs",
  legalName: registeredName,
  logo: siteUrl + "/studio/yuga-ring.png",
  url: siteUrl,
  email: "contact@yugamlabs.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={sans.variable + " " + mono.variable}
    >
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <Nav />
        {children}
        <Footer />
        {process.env.ai_token && <ChatWidget />}
      </body>
    </html>
  );
}
