import type { AnchorHTMLAttributes, ReactNode } from "react";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Arrow() {
  return <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Check() {
  return <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" /><path d="m5.5 9.2 2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* Every link that leaves the homepage points at the real acopia.co.uk URL and opens in a new tab. */
export function Ext({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  const external = !href.startsWith("#");
  return <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...rest}>{children}</a>;
}
