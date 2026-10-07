// Every word on the homepage, kept apart from the components.
// Copy is verbatim from https://acopia.co.uk/ (homepage) unless a comment names the inner page it came from.
// House rule for these demos: no em or en dashes; the few on the live site are rewritten as commas or colons.

export const SITE = "https://acopia.co.uk";

export type Img = { src: string; alt: string; w: number; h: number };
export type Link = { label: string; href: string };

export const hero = {
  title: ["Retail Consumables", "Simplified & Streamlined"],
  // Live: "...operational consumables - reducing cost, complexity and waste across every store."
  lead: "Helping multi-site retailers gain control of operational consumables, reducing cost, complexity and waste across every store.",
  primary: { label: "Speak to a Retail Specialist", href: `${SITE}/contact/` },
  secondary: { label: "See Your Maturity Score", href: "https://lp.acopia.co.uk/retail-consumables-maturity-assessment" },
  // Image from the live Resources article "Busy store" feature (wp-content/uploads/2026/08/Busy-Store-webp.webp).
  image: { src: "/media/Busy-Store-webp.webp", alt: "A busy multi-site retail store floor with shoppers between the rails", w: 1536, h: 1024 },
};

export type Challenge = { title: string; text: string; href: string; image: Img };
export const challenges = {
  title: "The Challenges Retailers Face",
  items: [
    { title: "Process Improvement", text: "Back-of-house inefficiencies can quietly impact store productivity and operational costs.", href: `${SITE}/retail/challenges/process-improvement/`, image: { src: "/media/Pains-Process-Improvement.webp", alt: "A store manager checking orders on a laptop", w: 520, h: 344 } },
    { title: "Cost Control", text: "Without visibility and governance, consumables spend can quietly erode retail margins.", href: `${SITE}/retail/challenges/cost-control/`, image: { src: "/media/Pains-Cost-Control.webp", alt: "A card payment at a retail till beside paper carrier bags", w: 520, h: 344 } },
    // Live heading reads "Supply Chain Resiliance"; the menu and the page itself spell it "Resilience".
    { title: "Supply Chain Resilience", text: "Multiple suppliers and unreliable deliveries create operational disruption.", href: `${SITE}/retail/challenges/supply-chain-resilience/`, image: { src: "/media/Pains-Supply-Chain-Resilience.webp", alt: "A paper carrier bag handed over a shop counter", w: 520, h: 344 } },
    { title: "Sustainability Goals", text: "Retailers must reduce waste, plastics and environmental impact while staying compliant.", href: `${SITE}/retail/challenges/supporting-sustainability-goals/`, image: { src: "/media/Pains-Sustainability.webp", alt: "A recycled material swing tag on a garment", w: 520, h: 344 } },
  ] as Challenge[],
  more: { label: "All retail challenges", href: `${SITE}/retail/challenges/` },
};

export const problem = {
  title: "Operational consumables are essential to everyday store operations",
  kicker: "...but they are rarely managed strategically",
  body: [
    "Across many retail businesses this category of GNFR becomes fragmented and reactive, with multiple suppliers, inconsistent ordering processes and limited visibility of spend across stores.",
    "The result is unnecessary cost, operational inefficiencies and sustainability challenges. For retailers operating across multiple locations, even small inefficiencies can multiply quickly.",
  ],
  painTitle: "Key pain points",
  pains: [
    "Limited visibility of consumables spend across stores",
    "Too many suppliers and inconsistent product standards",
    "Store teams wasting time sourcing everyday supplies",
    "Sustainability targets without operational control",
  ],
  // From /retail/processes/myacopia/
  fact: { value: "25%", text: "Everyday consumables that keep your business running can add up to 25% of your running costs." },
};

export const maturity = {
  title: "How Strategically Are You Managing Your Retail Consumables?",
  body: "The Retail Consumables Maturity Index helps retailers benchmark how effectively this category is being managed, and uncover opportunities to reduce cost, complexity and waste. It takes just a few minutes to complete and provides a personalised maturity score.",
  cta: { label: "See Your Maturity Score", href: "https://lp.acopia.co.uk/retail-consumables-maturity-assessment" },
  image: { src: "/media/Retail-Consumables-Maturity-Index.webp", alt: "The Retail Consumables Maturity Index assessment start screen", w: 425, h: 425 },
};

export type Benefit = { title: string; text: string };
export const moreWithLess = {
  title: "Doing More with Less",
  body: "Acopia's More with Less Methodology helps retailers streamline operational consumables across their store networks.",
  cta: { label: "Discover the More with Less Approach", href: `${SITE}/about/more-with-less/` },
  less: [
    { title: "Less Admin", text: "Remove manual ordering, fragmented purchasing and supplier management." },
    { title: "Less Complexity", text: "Simplify suppliers, products and processes across your store network." },
    { title: "Less Waste", text: "Reduce unnecessary packaging, stockholding and wasted store time." },
  ] as Benefit[],
  more: [
    { title: "More Time", text: "Free store teams to focus on customers and running great stores." },
    { title: "More Clarity", text: "Clear visibility of what is being purchased, used and spent across every store." },
    { title: "More Control", text: "Greater oversight of consumables usage, sustainability performance and costs." },
  ] as Benefit[],
  // The five pillars, from /about/more-with-less/
  pillarsTitle: "Core Pillars of our More with Less Methodology",
  pillars: [
    { title: "Discover", text: "Gain a clear understanding of your business, objectives, and current challenges through in-depth conversations and data analysis." },
    { title: "Diagnose", text: "Identify inefficiencies, gaps, and opportunities for improvement by assessing current processes, usage patterns, and procurement behaviours." },
    { title: "Define", text: "Develop a tailored plan aligned to your goals and KPIs, including recommendations for best-practice solutions, process improvements, and measurable outcomes." },
    { title: "Deploy", text: "Implement the agreed solution across your sites or supply chain, ensuring smooth rollout, minimal disruption, and full team support." },
    { title: "Develop", text: "Work in partnership to monitor performance and track results, optimising to reach best practice, deliver continuous improvement and achieve more with less." },
  ] as Benefit[],
};

export type Process = { title: string; text: string; href: string; image: Img };
export const deliver = {
  title: "How Retailers Deliver More With Less",
  body: "Acopia combines strategic insight, operational expertise and technology to help retailers simplify GNFR and operational consumables across their store networks.",
  items: [
    { title: "Consumables Health Check", text: "Identify hidden spend, fragmented suppliers and opportunities to simplify procurement.", href: `${SITE}/retail/processes/process-health-check/`, image: { src: "/media/Process-Health-Check.webp", alt: "A retailer reviewing store data on a tablet on the shop floor", w: 520, h: 344 } },
    { title: "Back-of-House Process Review", text: "Improve stockroom organisation, ordering processes and store efficiency.", href: `${SITE}/retail/processes/back-room-review/`, image: { src: "/media/Process-Backroom-Review.webp", alt: "Stacked cardboard boxes in a crowded stockroom", w: 520, h: 344 } },
    { title: "MyAcopia Platform", text: "Centralise ordering and gain full visibility of consumables spend across every location.", href: `${SITE}/retail/processes/myacopia/`, image: { src: "/media/Process-MyAcopia-1.webp", alt: "The MyAcopia ordering platform on a laptop and phone", w: 520, h: 344 } },
  ] as Process[],
  cta: { label: "Explore Our Retail Solutions", href: `${SITE}/retail/processes/` },
  // MyAcopia facts, from /retail/processes/myacopia/
  platform: {
    title: "One Supplier. One Portal. One Invoice.",
    body: "MyAcopia is a custom-built, online ordering platform that gives you complete visibility and control over your consumables procurement.",
    stats: [
      { value: "£50", text: "What every traditional transaction can cost in time and resource" },
      { value: "Same day", text: "Despatch, with next-day UK delivery and courier tracking" },
      { value: "£0", text: "MyAcopia is free to use across your entire team" },
    ],
    href: `${SITE}/retail/processes/myacopia/`,
  },
};

export const trusted = {
  title: "Trusted by Leading Retailers",
  body: [
    "For over 50 years, Acopia has supported retailers, charities and hospitality businesses with the everyday consumables that keep stores running.",
    "Working in partnership with our customers, we take away the pain of sourcing and managing their GNFR so that they can focus on what's important: their customers.",
  ],
  image: { src: "/media/Acopia-Group.webp", alt: "The Acopia Group building in Bognor Regis", w: 1200, h: 800 },
  // From /about/who-we-are/
  facts: [
    { value: "1976", text: "A third generation family business" },
    { value: "50,000", text: "Square foot warehouse in Bognor Regis" },
    { value: "5,000+", text: "SKUs serving thousands of businesses" },
  ],
  // Client logos in the live homepage strip order.
  logos: [
    ["Aldo", "Aldo"], ["Acorns", "Acorns Children's Hospice"], ["Barnardos-Charity", "Barnardo's"], ["Cats-Protection", "Cats Protection"],
    ["Dobbies-Garden-Centre", "Dobbies Garden Centres"], ["Helen-Douglas", "Helen & Douglas House"], ["Oxfam", "Oxfam"], ["ProCook", "ProCook"],
    ["Royal-Trinity-Hospice-1", "Royal Trinity Hospice"], ["Saltrock-Surfware", "Saltrock"], ["Scamp-Dude", "Scamp & Dude"], ["Urban-Outfitters", "Urban Outfitters"],
  ].map(([file, name]) => ({ src: `/media/logos/${file}.webp`, name, w: 200, h: file === "Urban-Outfitters" ? 78 : 200 })),
  more: { label: "Who we are", href: `${SITE}/about/who-we-are/` },
};

// "Our Story" timeline, verbatim from /about/who-we-are/
export const story = [
  { year: "1976", text: "Founded by Tim Lynes as Surrex Paper Bag Supplies, based in Redhill in Surrey." },
  { year: "1978", text: "With a growing customer base and a more diverse product range, the company changed names to Surrey Wholesale Packaging." },
  { year: "1995", text: "A true family business, Tim's oldest son Rolf joined the business, followed by Wayne in 1996 and Russell in 2000." },
  { year: "2010", text: "A period of acquisition began, notably Adams Packaging, Interlink Packaging, Brightstyle and Dunsdale." },
  { year: "2012", text: "The Acopia Group brand was born along with a relocation to a 50,000 sq ft facility in Bognor Regis." },
  { year: "2017", text: "MyAcopia, a single-source online portal for purchasing everyday consumables, was launched." },
  { year: "2019", text: "Keenan Lynes, grandson of founder Tim, joined the family business." },
  { year: "2020", text: "Introduced iWrap, a high-performance pallet wrap, and NEST, an eco-friendly eCommerce packaging range." },
  { year: "2022", text: "Launched iTack, a range of tapes made from recycled plastic, to the UK market." },
  { year: "2024", text: "Keenan took the helm as Managing Director, and the Velo Reusable Transfer and Storage Sack was launched." },
  { year: "2025", text: "The iWrap Hand System was launched as Acopia expanded into the US market, with operations based in Indianapolis." },
];

export type Insight = { title: string; text: string; date: string; read: string; href: string; image: Img };
// The four insights the live homepage features, in its order. Dates, read times and summaries from each article's meta.
export const insights = {
  title: "Retail Consumables Insights",
  items: [
    { title: "Why Retail Consumables are an overlooked management problem", text: "Reframe consumables as a management issue and move from reactive problem-solving to structured, scalable improvement.", date: "2026-03-04", read: "6 min read", href: `${SITE}/resources/retail/why-retail-consumables-are-an-overlooked-management-problem/`, image: { src: "/media/RCMI-Blog-Feature-Image.webp", alt: "Retail managers reviewing the Retail Consumables Maturity Index", w: 1200, h: 900 } },
    { title: "Single-Source Procurement vs. Multiple Suppliers", text: "Retailers often overestimate the risks of single source procurement and underestimate the cost of supplier complexity.", date: "2025-10-30", read: "6 min read", href: `${SITE}/resources/retail/single-source-procurement-vs-multiple-suppliers-retail-cost-savings/`, image: { src: "/media/Single-Source-Procurement-webp.webp", alt: "A businesswoman walking a tightrope above the clouds", w: 2048, h: 1366 } },
    { title: "5 Strategies for greater GNFR visibility across your retail estate", text: "Getting your GNFR strategies for procurement on track can help to drive cost savings right across your retail estate.", date: "2025-06-10", read: "4 min read", href: `${SITE}/resources/retail/5-gnfr-strategies-for-better-stock-visibility/`, image: { src: "/media/5-GNFR-Strategies-for-Better-Stock-Visibility.webp", alt: "Velo sacks stacked on a stockroom shelf", w: 981, h: 685 } },
    { title: "Five strategies for controlling retail procurement costs", text: "Discover new ways to control retail procurement costs and make the most of supplier relationships.", date: "2025-02-10", read: "5 min read", href: `${SITE}/resources/retail/your-guide-to-controlling-retail-procurement-costs/`, image: { src: "/media/Your-guide-to-controlling-retail-procurement-costs.webp", alt: "A smiling boutique owner among clothing rails", w: 2000, h: 1121 } },
  ] as Insight[],
  more: { label: "All resources", href: `${SITE}/resources/` },
};

export const closing = {
  title: "Ready to Achieve More With Less?",
  body: "Discover how Acopia helps retailers simplify operational consumables and improve control across their store networks.",
  cta: { label: "Speak to a Retail Specialist", href: `${SITE}/contact/` },
  // From the live Resources "Shop front" article image.
  image: { src: "/media/Shop-front-1536x1359.webp", alt: "A charity shop volunteer standing in an Oxfam shop doorway", w: 1536, h: 1359 },
};

// The copied Kina ticker, carrying the More with Less promise.
export const ticker = ["Less Admin", "More Time", "Less Complexity", "More Clarity", "Less Waste", "More Control"];

// Navigation: real URLs from the live header mega menu.
export const nav = {
  retail: [
    { title: "Challenges", href: `${SITE}/retail/challenges/`, links: [
      { label: "Process Improvement", href: `${SITE}/retail/challenges/process-improvement/` },
      { label: "Supporting Sustainability Goals", href: `${SITE}/retail/challenges/supporting-sustainability-goals/` },
      { label: "Cost Control", href: `${SITE}/retail/challenges/cost-control/` },
      { label: "Supply Chain Resilience", href: `${SITE}/retail/challenges/supply-chain-resilience/` },
      { label: "Achieving Best Practice", href: `${SITE}/retail/challenges/achieving-best-practice/` },
      { label: "Industry Expertise", href: `${SITE}/retail/challenges/industry-expertise/` },
    ] },
    { title: "Processes", href: `${SITE}/retail/processes/`, links: [
      { label: "Process Health Check", href: `${SITE}/retail/processes/process-health-check/` },
      { label: "Backroom Review", href: `${SITE}/retail/processes/back-room-review/` },
      { label: "MyAcopia", href: `${SITE}/retail/processes/myacopia/` },
    ] },
    { title: "Products", href: `${SITE}/retail/products/`, links: [
      { label: "Catering & Hospitality Supplies", href: `${SITE}/retail/products/catering-hospitality-supplies/` },
      { label: "Cleaning and Health & Safety", href: `${SITE}/retail/products/cleaning-supplies/` },
      { label: "eCommerce Packaging", href: `${SITE}/retail/products/ecommerce-packaging/` },
      { label: "Garden Centre Supplies", href: `${SITE}/retail/products/garden-centre-supplies/` },
      { label: "Packing Tape & Boxes", href: `${SITE}/retail/products/sustainable-packing-tape-boxes/` },
      { label: "Point-of-Sale Display Solutions", href: `${SITE}/retail/products/point-of-sale-display-solutions/` },
      { label: "Retail Bags", href: `${SITE}/retail/products/retail-bags/` },
      { label: "Shopfitting & Display Solutions", href: `${SITE}/retail/products/shopfittings/` },
      { label: "Stationery Essentials", href: `${SITE}/retail/products/stationery-essentials/` },
      { label: "Storage & Handling", href: `${SITE}/retail/products/storage-handling/` },
      { label: "Workplace Essentials", href: `${SITE}/retail/products/workplace-essentials/` },
      { label: "Wrapping & Strapping", href: `${SITE}/retail/products/wrapping-strapping/` },
    ] },
  ],
  about: [
    { label: "Who We Are", href: `${SITE}/about/who-we-are/` },
    { label: "Purpose and Values", href: `${SITE}/about/purpose-and-values/` },
    { label: "Leadership Team", href: `${SITE}/about/leadership-team/` },
    { label: "More with Less", href: `${SITE}/about/more-with-less/` },
    { label: "Corporate Social Responsibility", href: `${SITE}/about/corporate-social-responsibility/` },
    { label: "Customer Experience", href: `${SITE}/about/customer-experience/` },
    { label: "Careers", href: `${SITE}/about/careers/` },
  ],
  resources: [
    { label: "All Resources", href: `${SITE}/resources/` },
    { label: "Corporate", href: `${SITE}/resources/category/corporate/` },
    { label: "Retail", href: `${SITE}/resources/category/retail/` },
  ],
  // Acopia's own product brands, shown in the live Products mega menu.
  brands: [
    { name: "MyAcopia", src: "/media/brands/myacopia.svg", href: `${SITE}/retail/processes/myacopia/` },
    { name: "Everoll", src: "/media/brands/everoll.svg", href: `${SITE}/retail/products/point-of-sale-display-solutions/everoll/` },
    { name: "Velo", src: "/media/brands/velo.svg", href: `${SITE}/retail/products/point-of-sale-display-solutions/velo/` },
    { name: "Nest", src: "/media/brands/nest.svg", href: `${SITE}/retail/products/ecommerce-packaging/nest/` },
    { name: "Miniml", src: "/media/brands/miniml.svg", href: `${SITE}/retail/products/cleaning-supplies/miniml/` },
    { name: "iTack", src: "/media/brands/itack.png", href: `${SITE}/retail/products/tape-and-boxes/itack/` },
  ],
  // Header shortcuts: two scroll to homepage sections, the rest go to the live site.
  bar: [
    { label: "Challenges", href: "#challenges" },
    { label: "Processes", href: "#processes" },
    { label: "About", href: `${SITE}/about/` },
    { label: "Resources", href: `${SITE}/resources/` },
  ] as Link[],
  contact: { label: "Contact", href: `${SITE}/contact/` },
  myacopia: { label: "MyAcopia", href: "https://myacopia.co.uk/" },
};

export const footer = {
  statement: "Empowering organisations globally to achieve more with less... less cost, less waste, and less complexity.", // /about/purpose-and-values/
  groups: [
    { title: "Corporate", links: [{ label: "About", href: `${SITE}/about/` }, { label: "Resources", href: `${SITE}/resources/` }, { label: "Contact", href: `${SITE}/contact/` }, { label: "Careers", href: `${SITE}/about/careers/` }] },
    { title: "Retail", links: [{ label: "Your Challenges", href: `${SITE}/retail/challenges/` }, { label: "Our Processes", href: `${SITE}/retail/processes/` }, { label: "Our Products", href: `${SITE}/retail/products/` }, { label: "MyAcopia", href: "https://myacopia.co.uk/" }] },
  ],
  socials: [
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/AcopiaGroup/" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/acopiagroup/" },
    { label: "X", icon: "x", href: "https://twitter.com/acopiagroup" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/acopia-group-ltd" },
    { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/@acopiagroupltd" },
  ] as const,
  legal: [
    { label: "Terms & Conditions", href: `${SITE}/terms-conditions/` },
    { label: "Privacy Policy", href: `${SITE}/privacy-policy/` },
    { label: "Cookie Policy", href: `${SITE}/cookie-policy/` },
  ],
  copyright: "Copyright © 2026 Acopia. All Rights Reserved",
};
