"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { reducedMotion } from "@/components/ui";
import { splitLines } from "@/lib/split";
import { getLenis, setLenis } from "@/lib/scroll";

/* Smooth scroll, the five reveal moves, anchors and the private-demo link guard. Mounted once by the page.
   The reveal set (README "Motion system"): every move plays once, uses the expo.out family, and runs 25%
   shorter inside sections marked data-late. Nothing is scrubbed except the image parallax. */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = reducedMotion();
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      // lerp instead of a fixed duration: no catch-up lag at the bottom of the page (Kier feedback).
      lenis = new Lenis({ lerp: .12, wheelMultiplier: 1 });
      setLenis(lenis);
      if (document.documentElement.classList.contains("is-loading")) lenis.stop();
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const restores: (() => void)[] = [];
    const ctx = gsap.context(() => {
      const pace = (el: Element) => (el.closest("[data-late]") ? .75 : 1);
      const ease = "expo.out";
      const all = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));
      if (reduced) return;

      // 1. Headings: the whole phrase fades and rises once.
      all('[data-reveal="heading"]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 * pace(el), ease, clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // 2. Paragraphs: a soft line mask; the original markup returns once it has played.
      all('[data-reveal="text"]').forEach((el) => {
        const { lines, restore } = splitLines(el);
        el.setAttribute("data-split-ready", "");
        restores.push(restore);
        gsap.fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: .9 * pace(el), ease, stagger: .06,
          scrollTrigger: { trigger: el, start: "top 90%", once: true }, onComplete: restore });
      });

      // 3. Labels, buttons and small rows: a short fade.
      all('[data-reveal="fade"]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6 * pace(el), ease, clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 94%", once: true } });
      });

      // 4. Cards: batched, so a row arrives together with a small stagger.
      ScrollTrigger.batch('[data-reveal="card"]', { start: "top 92%", once: true,
        onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .9 * pace(batch[0]), ease, stagger: .08, clearProps: "transform" }) });

      // 5. Images: the frame clips open from below, and the photo inside drifts about 10% against the scroll.
      all('[data-reveal="image"]').forEach((el) => {
        gsap.to(el, { clipPath: "inset(0% 0 0 0 round 16px)", duration: 1.1 * pace(el), ease, clearProps: "clipPath",
          scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        const img = el.querySelector("img");
        if (img && el.hasAttribute("data-parallax")) {
          gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        }
      });
    });

    // Header: tone follows whatever section sits under it; hides on the way down, returns on the way up.
    const header = document.querySelector<HTMLElement>(".header");
    let lastY = window.scrollY, frame = 0;
    const update = () => {
      frame = 0;
      if (!header) return;
      const y = window.scrollY;
      const probe = header.getBoundingClientRect().bottom - 20;
      let tone = "dark";
      document.querySelectorAll<HTMLElement>("[data-tone]").forEach((s) => {
        if (s === header) return;
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) tone = s.dataset.tone ?? tone;
      });
      header.dataset.tone = tone;
      const menuOpen = document.documentElement.classList.contains("menu-open");
      header.classList.toggle("is-hidden", !menuOpen && y > 160 && y > lastY + 2);
      if (y < lastY - 2 || y <= 160) header.classList.remove("is-hidden");
      lastY = y;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();

    /* Anchors go through Lenis. Private-demo rule: links that would leave the page keep their real href
       (and target/rel) but do nothing when clicked, so the prospect stays on the demo. */
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("#")) { event.preventDefault(); return; }
      const target = href === "#top" ? null : document.querySelector<HTMLElement>(href);
      if (href !== "#top" && !target) return;
      event.preventDefault();
      const go = () => {
        const l = getLenis();
        if (l) l.scrollTo(target ?? 0, { force: true, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
        else if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
        if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
      };
      // From inside the menu, wait for it to close and release the scroll lock first.
      if (document.documentElement.classList.contains("menu-open")) window.setTimeout(go, 80); else go();
    };
    const onAux = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (link && !(link.getAttribute("href") ?? "").startsWith("#")) event.preventDefault();
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAux, true);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onAux, true);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(frame);
      ctx.revert();
      restores.forEach((r) => r());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy(); setLenis(null);
    };
  }, []);
  return null;
}

/* Focus trap for the full-screen menu: stops Lenis, keeps Tab inside, Esc closes, focus returns to the trigger. */
export function trapFocus(container: HTMLElement, close: () => void, trigger: HTMLElement | null) {
  getLenis()?.stop();
  const focusable = () => Array.from(container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  focusable()[0]?.focus();
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key !== "Tab") return;
    const items = focusable(); const first = items[0]; const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener("keydown", onKey);
  return () => { document.removeEventListener("keydown", onKey); getLenis()?.start(); trigger?.focus(); };
}
