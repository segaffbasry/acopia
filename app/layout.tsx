import type { Metadata, Viewport } from "next";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The live homepage's own title and description. Private demo: never indexed, never followed.
export const metadata: Metadata = {
  title: "Acopia | Retail Consumables Simplified & Streamlined",
  description: "Helping multi-site retailers gain control of operational consumables, reducing cost, complexity and waste across every store.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/* Runs before first paint. Unless reduced motion is requested it adds `js` (so reveal targets can start hidden
   without a flash) and `is-loading` for the preloader, which plays on every load. Without JavaScript nothing is
   hidden and the preloader never shows (see the <noscript> style too). */
const boot = "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done';return}d.classList.add('js','is-loading')})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/poppins-latin-600-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
