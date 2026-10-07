"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Logo from "@/components/Logo";
import { reducedMotion } from "@/components/ui";
import { getLenis } from "@/lib/scroll";

/* The opening moment: Acopia signs its name. The six letters rise out of the baseline one after another, the
   round i-dot drops onto its stem, the ® settles, then the whole wordmark flies into the header logo position
   (turning white as it lands on the hero photo) while the white ground fades to reveal the hero.
   One GSAP timeline: build 0.1 to 0.85s, hold, exit 1.15 to 1.85s. Handover fires as the exit starts so the
   hero entrance overlaps it. Plays on every load, never waits for assets, skipped with reduced motion. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    let handed = false;
    const handover = () => {
      if (handed) return;
      handed = true;
      root.classList.remove("is-loading");
      root.dataset.intro = "done";
      getLenis()?.start();
      document.dispatchEvent(new Event("intro:done"));
    };
    if (!el || reducedMotion()) { handover(); root.classList.add("logo-landed"); return; }
    getLenis()?.stop();

    const mark = el.querySelector<HTMLElement>(".preloader-logo")!;
    const letters = ["a", "c", "o", "p", "i", "a2"].map((id) => mark.querySelector(`[data-part="${id}"]`));
    const dot = mark.querySelector('[data-part="i-dot"]');
    const reg = mark.querySelectorAll('[data-part^="reg"]');
    const target = document.querySelector<HTMLElement>(".header .header-logo");

    // Where the header logo sits, measured when the exit starts (after any font swap or resize).
    let flight = { x: 0, y: 0, scale: 1 };
    const measure = () => {
      if (!target) return;
      const a = mark.getBoundingClientRect(), b = target.getBoundingClientRect();
      flight = { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };

    const land = () => { root.classList.add("logo-landed"); el.classList.remove("is-exiting"); el.style.display = "none"; };
    const tl = gsap.timeline({ onComplete: land });
    // Letters start one full wordmark height below the baseline; the svg's own bounds act as the mask.
    tl.fromTo(letters, { opacity: 1, y: 300 }, { y: 0, duration: .55, ease: "expo.out", stagger: .07 }, .1)
      .fromTo(dot, { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: .5, ease: "back.out(2.2)" }, .6)
      .to(reg, { opacity: 1, duration: .3, ease: "power2.out" }, .8)
      .add(() => { measure(); el.classList.add("is-exiting"); handover(); }, 1.15)
      .to(el, { backgroundColor: "rgba(255,255,255,0)", duration: .55, ease: "power2.inOut" }, 1.15)
      .to(mark, { x: () => flight.x, y: () => flight.y, scale: () => flight.scale, color: "#ffffff", duration: .7, ease: "expo.inOut" }, 1.15);

    // Safety: never block the page beyond about two seconds, even if the tab was throttled.
    const guard = window.setTimeout(handover, 2200);
    // Cleanup only stops this run. It must not hand over: React's development double mount runs it straight away,
    // and the second mount then plays the intro from the start.
    return () => { window.clearTimeout(guard); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="preloader-logo"><Logo title="" /></div>
    </div>
  );
}
