"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Arrow, Ext, reducedMotion } from "@/components/ui";
import { hero } from "@/lib/content";

/* kina.co's opening: a full-bleed photograph inside an inset 24px card, the statement set large at the bottom
   left and the supporting line with actions beside it. The entrance waits for the preloader's intro:done:
   the photo settles from 1.08 scale while each headline line rises out of its mask. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return;
    const img = el.querySelector(".hero-media img");
    const lines = el.querySelectorAll(".hero h1 .line > span");
    const side = el.querySelectorAll(".hero-side > *");
    gsap.set(img, { scale: 1.08 });
    gsap.set(lines, { yPercent: 110 });
    gsap.set(side, { opacity: 0, y: 14 });
    const play = () => gsap.timeline()
      .to(img, { scale: 1, duration: 1.6, ease: "expo.out" }, 0)
      .to(lines, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: .1 }, .15)
      .to(side, { opacity: 1, y: 0, duration: .8, ease: "expo.out", stagger: .07, clearProps: "transform" }, .45);
    if (document.documentElement.dataset.intro === "done") play();
    else document.addEventListener("intro:done", play, { once: true });
    // As the hero scrolls away the photo drifts down slightly behind its frame (the hero is the one place a scrub is allowed).
    gsap.registerPlugin(ScrollTrigger);
    const drift = gsap.fromTo(img, { yPercent: 0 }, { yPercent: 9, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    return () => { document.removeEventListener("intro:done", play); gsap.killTweensOf([img, lines, side]); drift.scrollTrigger?.kill(); drift.kill(); };
  }, []);

  return (
    <section className="hero" id="top" ref={ref} data-tone="light">
      <div className="hero-card on-dark">
        <div className="hero-media">
          <Image src={hero.image.src} alt={hero.image.alt} width={hero.image.w} height={hero.image.h} priority sizes="100vw" />
        </div>
        <div className="hero-inner">
          <h1 className="h1">{hero.title.map((t) => <span className="line" key={t}><span>{t}</span></span>)}</h1>
          <div className="hero-side">
            <p className="lead">{hero.lead}</p>
            <div className="hero-actions">
              <Ext className="btn btn-white" href={hero.primary.href}>{hero.primary.label} <Arrow /></Ext>
              <Ext className="btn btn-ghost" href={hero.secondary.href}>{hero.secondary.label}</Ext>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
