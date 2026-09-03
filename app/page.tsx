import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import TaglineReveal from "@/components/TaglineReveal";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Faq from "@/components/Faq";
import { faqs } from "@/lib/faqs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <TaglineReveal />
        <HowWeWork />
        <Testimonials />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
