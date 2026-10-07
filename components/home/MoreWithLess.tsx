"use client";

import { useRef, useState } from "react";
import { Arrow, Ext } from "@/components/ui";
import { moreWithLess as m } from "@/lib/content";

/* Navy panel. The live six benefit tiles become three "less to more" pairs (each less earns a more), followed by
   the five methodology pillars from /about/more-with-less/ as an accessible tab set. */
export default function MoreWithLess() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (event: React.KeyboardEvent, i: number) => {
    const n = m.pillars.length;
    const next = event.key === "ArrowRight" ? (i + 1) % n : event.key === "ArrowLeft" ? (i - 1 + n) % n : event.key === "Home" ? 0 : event.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  };
  const pillar = m.pillars[active];

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

        <div className="mwl-labels" aria-hidden="true"><span>Less</span><span /><span>More</span></div>
        <ul className="mwl-pairs">
          {m.less.map((l, i) => (
            <li className="mwl-pair" key={l.title} data-reveal="card">
              <div><h3 className="h3">{l.title}</h3><p>{l.text}</p></div>
              <svg className="arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="more"><h3 className="h3">{m.more[i].title}</h3><p>{m.more[i].text}</p></div>
            </li>
          ))}
        </ul>

        <div className="pillars">
          <div data-reveal="fade">
            <h3 className="h3" id="pillars-title">{m.pillarsTitle}</h3>
            <div className="pillars-tabs" role="tablist" aria-labelledby="pillars-title">
              {m.pillars.map((p, i) => (
                <button key={p.title} ref={(b) => { tabs.current[i] = b; }} type="button" role="tab" id={`pillar-tab-${i}`} aria-selected={active === i}
                  aria-controls="pillar-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}>{p.title}</button>
              ))}
            </div>
          </div>
          <div className="pillars-panel" id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${active}`} data-reveal="fade">
            <h4 className="h3">{pillar.title}</h4>
            <p>{pillar.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
