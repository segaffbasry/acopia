"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/ui";
import { ticker } from "@/lib/content";

/* Copied interaction: kina.co's footer ticker (Framer Ticker), measured on the live page.
   Pill 59px, radius 100px, items 64px apart, 16px text, right-to-left drift at 30px per second, linear.
   Separator: kina's 16px "triangle dots", three r=2 circles pulsing opacity 1, .65, .3, 1 over 1.8s with
   0, .6 and 1.2s offsets (SMIL, as on kina). The list is cloned enough times to cover any width, then
   translated by exactly one list width per loop. Pauses off-screen; static with reduced motion. */
const SPEED = 30; // px per second, kina.co: 77px over 2.56s

function Dots() {
  const pts = [[8, 2, "0s"], [2.803847577293368, 11, ".6s"], [13.196152422706632, 11, "1.2s"]] as const;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {pts.map(([cx, cy, begin]) => (
        <circle key={begin} cx={cx} cy={cy} r="2" fill="currentColor">
          <animate attributeName="opacity" values="1;0.65;0.3;1" dur="1.8s" begin={begin} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {ticker.flatMap((t) => [<li key={t}>{t}</li>, <li key={`${t}-d`}><Dots /></li>])}
    </ul>
  );
}

export default function Ticker() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>("ul"));
    let x = 0, last = 0, raf = 0, visible = false;
    const step = (t: number) => {
      const w = rows[0].offsetWidth;
      if (last) x = (x - SPEED * (t - last) / 1000) % w;
      last = t;
      rows.forEach((r) => { r.style.transform = `translate3d(${x}px,0,0)`; });
      raf = visible ? requestAnimationFrame(step) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting; last = 0;
      if (visible && !raf) raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="ticker" ref={ref} role="marquee" aria-label={ticker.join(", ")}>
      <Row hidden /><Row hidden /><Row hidden />
    </div>
  );
}
