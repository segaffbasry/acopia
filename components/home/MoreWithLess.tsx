"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Arrow, Ext, reducedMotion } from "@/components/ui";
import { moreWithLess as m } from "@/lib/content";

const STEP = 5200; // ms each less-to-more pair stays up before the next rolls in

/* Navy showpiece (client feedback, 8 Oct: "elevate this, not a lot of movement").
   The live six tiles become three exchanges, "Less Admin / More Time" and so on. The two words roll vertically
   into place, the photo beside them wipes up to the next real image, and a Hunar-style progress bar under each
   pair shows when the next one arrives. It cycles only while on screen, pauses on hover or focus, and never
   cycles with reduced motion. The five methodology pillars follow as a horizontal accordion. */
export default function MoreWithLess() {
  const [pair, setPair] = useState(0);
  const [pillar, setPillar] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const pillarTabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Cycle only while the stage is visible.
  useEffect(() => {
    const el = stage.current; if (!el || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: .35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!running || paused) return;
    const t = window.setTimeout(() => setPair((p) => (p + 1) % m.less.length), STEP);
    return () => window.clearTimeout(t);
  }, [running, paused, pair]);

  const onPillarKey = (event: React.KeyboardEvent, i: number) => {
    const n = m.pillars.length;
    const next = event.key === "ArrowRight" ? (i + 1) % n : event.key === "ArrowLeft" ? (i - 1 + n) % n : event.key === "Home" ? 0 : event.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); setPillar(next); pillarTabs.current[next]?.focus();
  };

  return (
    <section className="panel mwl on-dark" id="more-with-less" data-tone="light" aria-labelledby="mwl-title">
      <div className="wrap">
        <div className="mwl-head">
          <h2 className="h2" id="mwl-title" data-reveal="heading">{m.title}</h2>
          <div className="side">
            <p className="body" data-reveal="text">{m.body}</p>
            <Ext className="link" href={m.cta.href} data-reveal="fade">{m.cta.label} <Arrow /></Ext>
          </div>
        </div>

        <div className={`mwl-stage${running && !paused ? " is-running" : ""}`} ref={stage}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="mwl-copy">
            <p className="mwl-statement" aria-live="polite">
              <span className="mwl-row">Less <Roll words={m.less.map((l) => l.title.replace("Less ", ""))} index={pair} /></span>
              <span className="mwl-row is-more">More <Roll words={m.more.map((l) => l.title.replace("More ", ""))} index={pair} /></span>
            </p>
            <div className="mwl-detail" key={pair}>
              <p><strong>{m.less[pair].title}</strong>{m.less[pair].text}</p>
              <p><strong>{m.more[pair].title}</strong>{m.more[pair].text}</p>
            </div>
            <div className="mwl-tabs" role="tablist" aria-label="Less to more">
              {m.less.map((l, i) => (
                <button key={l.title} type="button" role="tab" aria-selected={pair === i} onClick={() => setPair(i)}>
                  <span>{l.title.replace("Less ", "")} <Arrow /> {m.more[i].title.replace("More ", "")}</span>
                  <i aria-hidden="true" key={pair === i ? `on-${pair}` : "off"} style={{ animationDuration: `${STEP}ms` }} />
                </button>
              ))}
            </div>
          </div>
          <div className="mwl-photos" data-reveal="image">
            {m.pairImages.map((img, i) => (
              <div key={img.src} className={`mwl-photo${i === pair ? " is-active" : ""}`} aria-hidden={i !== pair}>
                <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>

        <div className="pillars">
          <h3 className="h3" id="pillars-title" data-reveal="fade">{m.pillarsTitle}</h3>
          <div className="pillars-row" role="tablist" aria-labelledby="pillars-title">
            {m.pillars.map((p, i) => (
              <button key={p.title} ref={(b) => { pillarTabs.current[i] = b; }} type="button" role="tab" data-reveal="card"
                className={`pillar${pillar === i ? " is-active" : ""}`} aria-selected={pillar === i} tabIndex={pillar === i ? 0 : -1}
                onClick={() => setPillar(i)} onMouseEnter={() => setPillar(i)} onKeyDown={(e) => onPillarKey(e, i)}>
                <span className="pillar-title">{p.title}</span>
                <span className="pillar-text">{p.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* A word slot that rolls vertically to the active word and eases its width to fit (INTEC feedback: roll, don't type). */
function Roll({ words, index }: { words: string[]; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const measure = () => setWidth((el.children[index] as HTMLElement | undefined)?.offsetWidth);
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);
  return (
    <span className="roll" style={{ width }}>
      <span className="roll-track" ref={ref} style={{ transform: `translateY(${-index * 100 / words.length}%)` }}>
        {words.map((w, i) => <span key={w} aria-hidden={i !== index}>{w}</span>)}
      </span>
    </span>
  );
}
