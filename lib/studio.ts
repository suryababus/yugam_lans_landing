export const siteUrl = "https://yugamlabs.in";
export const registeredName = "Yugam Labs Software Solution Private Limited";

export const services = [
  {
    slug: "web-app-development",
    name: "Web applications",
    title: "Custom web app development",
    summary:
      "Customer portals, commerce platforms, and internal tools built around the way people work.",
    fit: "When orders, approvals, or customer requests move between spreadsheets and email, a web app can give everyone one place to work. We map the people, permissions, and data behind that workflow before designing the screens.",
    deliverables: [
      "A clickable prototype of the core user journey",
      "A responsive application with role-based access and API integrations",
      "Release checks, deployment notes, and a walkthrough for your team",
    ],
    question: "Can you extend our existing web app?",
    answer:
      "Yes. We start by reviewing the current code, deployment setup, and the workflow you want to change. That gives us a basis for estimating an extension or a staged rebuild.",
    brief:
      "Bring a sample spreadsheet, a recording of the current workflow, or the URL of the app you want to improve.",
    stack: "React · Next.js · TypeScript",
    project: "resort-room-booking",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile apps",
    title: "iOS and Android app development",
    summary:
      "Mobile products for iOS and Android, from the first interaction to store submission.",
    fit: "A field technician with patchy reception and a customer booking from the sofa need different apps. We prototype the most important task on a real device, then decide what needs native access, offline storage, or a shared codebase.",
    deliverables: [
      "An on-device prototype of your main flow",
      "iOS and Android builds connected to your services",
      "Device testing, store submission support, and release documentation",
    ],
    question: "Can both platforms share a codebase?",
    answer:
      "Often, yes. We review device features, accessibility needs, and performance requirements first. Camera, Bluetooth, and background tasks sometimes call for platform-specific code.",
    brief:
      "Tell us who will use the app, which phones they carry, and the one task they should be able to finish on the go.",
    stack: "React Native · Flutter · Native APIs",
    project: "field-service-tracker",
  },
  {
    slug: "ai-automation",
    name: "AI automation",
    title: "AI workflow automation",
    summary:
      "Document processing, support triage, and review workflows that connect to your existing tools.",
    fit: "Start with a repeatable task. For an incoming support email, for example, a workflow can identify the request, retrieve an approved answer, and prepare a draft for a colleague to review. The team keeps control over what goes to the customer.",
    deliverables: [
      "A workflow map showing data access and approval points",
      "A pilot evaluated against representative examples and exceptions",
      "Logging, fallback rules, and operating instructions for your team",
    ],
    question: "How do we know if the automation is worth rolling out?",
    answer:
      "We agree on a baseline with you, such as minutes spent reviewing each request. During a pilot we measure time saved alongside correction rates, operating cost, and cases that still need a person.",
    brief:
      "Bring anonymized examples of inputs, the output you expect, and a few cases your team finds difficult.",
    stack: "Model APIs · Python · Integrations",
    project: "whatsapp-order-desk",
  },
  {
    slug: "embedded-systems",
    name: "Embedded systems",
    title: "Embedded systems development",
    summary:
      "Firmware and connected-device software, from board bring-up to the cloud interface.",
    fit: "Connected products depend on the whole chain working together. We trace a reading from the sensor through firmware and connectivity to the screen where someone acts on it, including what should happen when the device goes offline.",
    deliverables: [
      "A hardware and connectivity review",
      "Firmware for the agreed peripherals and telemetry path",
      "Device validation steps and a documented update process",
    ],
    question: "What do you need before firmware work starts?",
    answer:
      "A schematic, target microcontroller, and a development board help us scope the work. If the hardware is still changing, we can identify interfaces that can be tested on a development kit first.",
    brief:
      "Share your board revision, available hardware, and the measurements or actions the device must support.",
    stack: "C / C++ · RTOS · Device telemetry",
    project: null,
  },
];

export const projects = [
  {
    slug: "gotso",
    name: "Gotso",
    category: "Web application",
    industry: "Photo printing",
    summary:
      "A photo-book studio that turns a camera roll into an editable album, then a printed book.",
    website: "https://gotso.in",
    tech: "Next.js · Browser-based image processing · Supabase · Razorpay",
    detail:
      "A trip often leaves you with several versions of the same moment. Gotso groups similar photos on your device and suggests a keeper from each group. You choose the photos, edit the page layouts, and order the finished book.",
    features: [
      "On-device photo comparison helps people narrow down a large collection before laying out the album.",
      "The editor arranges photos on the page and lets people adjust the layout, rewrite page text, and create cover art from selected photos.",
      "The print workflow connects checkout to a print-ready book file and order fulfillment.",
    ],
    service: "web-app-development",
    image: "/studio/gotso.webp",
  },
  {
    slug: "play-with-friends",
    name: "Play with Friends",
    category: "Web application",
    industry: "Multiplayer games",
    summary: "A browser-based game club where friends can join a room and play together without creating an account.",
    website: "https://playwithfriends.in",
    tech: "React · Node.js · Socket.IO",
    detail: "One group might settle in for Indian Rummy while another wants a quick round of Word Impostor. Players can browse by group size and typical play time, read the rules, and meet at the same virtual table.",
    features: [
      "Game pages explain the rules and show how many people can join before the host picks a game.",
      "Friends can join a shared room and use optional voice chat while they play.",
      "Many games include practice bots, so a player can learn the rules before inviting the group.",
    ],
    service: "web-app-development",
    image: "/studio/play-with-friends.webp",
  },
  {
    slug: "penkite",
    name: "Penkite",
    category: "Motion website",
    industry: "Branding & marketing",
    summary: "A flying paper kite leads visitors through Penkite’s brand and campaign work, from packaging studies to a twelve-second studio reel.",
    preview: "/sites/penkite/index.html",
    tech: "HTML · CSS animation · JavaScript · HTML5 video",
    detail: "A prospective client can watch the visual direction in twelve seconds, open a study to read its brief, or jump straight to the studio’s services. Penkite’s two founders and project contact sit alongside the work.",
    features: [
      "An animated paper kite carries Penkite’s pen-nib mark. Its streaming ribbons, moving type, and scrolling project reveals share a site-wide pause control.",
      "Expandable project and service notes keep the work scannable on a phone.",
      "The standalone site serves its fonts and media locally, respects reduced-motion preferences, and offers a direct email inquiry.",
    ],
    service: "web-app-development",
    image: "/studio/penkite.webp",
  },
  {
    slug: "resort-room-booking",
    name: "Resort Room Booking System",
    concept: true,
    category: "Web application",
    industry: "Hospitality",
    summary: "A direct booking concept that gives guests and the resort front desk a shared view of available rooms.",
    tech: "Next.js · PostgreSQL",
    detail: "A guest wants a poolside cottage for two nights. At the same time, reception is taking a phone booking for the last cottage. Both booking paths would draw from the same inventory, with a short hold while the guest pays the deposit.",
    features: [
      "Guests compare available room types for their dates, see the full price, and review deposit and cancellation terms before booking.",
      "A successful deposit confirms the reservation. If the hold expires before payment, the room returns to availability.",
      "Reception can enter phone bookings, block rooms for maintenance, and see the day’s arrivals and outstanding balances.",
    ],
    service: "web-app-development",
    image: "/studio/resort-room-booking.webp",
  },
  {
    slug: "whatsapp-order-desk",
    name: "WhatsApp Order Desk",
    concept: true,
    category: "AI automation",
    industry: "Wholesale distribution",
    summary: "A sales desk concept that turns a retailer’s WhatsApp message into an order draft for a distributor to review.",
    tech: "WhatsApp Business Platform · TypeScript · PostgreSQL",
    detail: "A retailer asks for “12 boxes of the usual tea, delivery Friday.” The proposed desk would look up the retailer’s recent orders, suggest a catalog item, and show the original message beside the draft. A salesperson would confirm the pack size and delivery date before accepting it.",
    features: [
      "Match product nicknames against the distributor’s catalog and highlight ambiguous items for the salesperson.",
      "Show quantities, units, and requested dates alongside the source message so the reviewer can correct the draft.",
      "After approval, issue an order reference and pass the confirmed lines to the packing team.",
    ],
    service: "ai-automation",
    image: "/studio/whatsapp-order-desk.webp",
  },
  {
    slug: "field-service-tracker",
    name: "Field Service Tracker",
    concept: true,
    category: "Mobile application",
    industry: "Repair and maintenance",
    summary: "A dispatch and mobile job-sheet concept for service businesses, from the first call to an invoice-ready visit.",
    tech: "React Native · SQLite · PostgreSQL",
    detail: "When an air conditioner fails again, the next technician needs to know what happened on the last visit. The job sheet would put equipment history, the customer’s report, and the assigned visit on one screen before the technician leaves the office.",
    features: [
      "The dispatcher assigns a technician and time window, with the site address and equipment history attached.",
      "On site, the technician records parts, labour, and customer sign-off, even when the phone is offline.",
      "Once synced, completed jobs move to the billing queue. Visits waiting on a spare part stay open for a return appointment.",
    ],
    service: "mobile-app-development",
    image: "/studio/field-service-tracker.webp",
  },
  {
    slug: "studio-assistant",
    name: "Studio Assistant",
    category: "AI automation",
    industry: "Studio tool",
    summary:
      "A conversational interface for questions about Yugam Labs services, pricing, and delivery.",
    repo: "https://github.com/suryababus/yugam_lans_landing",
    tech: "Next.js · Groq · Streaming responses",
    detail:
      "Visitors often have a question before they are ready to write a project brief. This in-house implementation gives a language model a defined set of studio facts and asks it to direct project-specific inquiries to the team.",
    features: [
      "The server checks message roles, length, and conversation size before calling the model.",
      "A streaming response displays the answer as it arrives in the chat widget.",
      "The model connection runs on the server, with its credential supplied through the environment.",
    ],
    service: "ai-automation",
    image: "/studio/knot.webp",
  },
];
