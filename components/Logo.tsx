import { logoParts, logoViewBox } from "@/lib/logo";

/* The official Acopia wordmark drawn from its own nine vector shapes (lib/logo.ts), filled with currentColor
   so the header, menu, footer and preloader can colour it. Each shape carries data-part for the preloader. */
export default function Logo({ title = "Acopia" }: { title?: string }) {
  return (
    <svg viewBox={logoViewBox} role="img" aria-label={title} focusable="false">
      {logoParts.map((p) => <path key={p.id} data-part={p.id} d={p.d} fill="currentColor" />)}
    </svg>
  );
}
