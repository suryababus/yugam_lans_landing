import { ContactBand, Intro, ProjectCards } from "@/components/StudioUI";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Software project portfolio",
  "Explore the Penkite motion website, Gotso, Play with Friends, and studio concepts for resort bookings, wholesale orders, and field service.",
  "/portfolio",
);
export default function Portfolio() {
  return (
    <main id="main" className="wrap inner">
      <Intro
        section="Portfolio"
        title="Selected work."
        summary="Try a live product or explore how we’d handle the last available resort room, an order sent over WhatsApp, or a repair visit that needs a second call."
      />
      <ProjectCards />
      <ContactBand />
    </main>
  );
}
