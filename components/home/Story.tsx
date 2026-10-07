"use client";

import { useRef, useState } from "react";
import { story } from "@/lib/content";

/* Signature visual built from the real Our Story milestones (/about/who-we-are/): a 1976 to 2025 rail.
   Hover, focus or tap a year; the blue fill runs up to it. Arrow keys move between years (tab pattern). */
export default function Story() {
  const [active, setActive] = useState(story.length - 1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = story.length;
  const go = (i: number) => { setActive(i); tabs.current[i]?.focus(); };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? Math.min(n - 1, i + 1) : e.key === "ArrowLeft" ? Math.max(0, i - 1) : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next >= 0) { e.preventDefault(); go(next); }
  };
  const item = story[active];
  return (
    <div className="story" data-reveal="card">
      <div className="story-head">
        <h3 className="h3" id="story-title">Our Story, from Redhill to Indianapolis</h3>
        <span>Choose a year</span>
      </div>
      <div className="story-rail" role="tablist" aria-labelledby="story-title">
        <span className="fill" aria-hidden="true" style={{ transform: `scaleX(${active / (n - 1)})` }} />
        {story.map((s, i) => (
          <button key={s.year} ref={(b) => { tabs.current[i] = b; }} type="button" role="tab" id={`story-${s.year}`} aria-selected={active === i} aria-controls="story-panel"
            tabIndex={active === i ? 0 : -1} className={i < active ? "is-past" : undefined}
            onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}>{s.year}</button>
        ))}
      </div>
      <div className="story-text" id="story-panel" role="tabpanel" aria-labelledby={`story-${item.year}`} aria-live="polite">
        <strong>{item.year}</strong>
        <p>{item.text}</p>
      </div>
    </div>
  );
}
