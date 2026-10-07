"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { trapFocus } from "@/components/Motion";
import { Ext, reducedMotion } from "@/components/ui";
import { nav } from "@/lib/content";

/* Frameless header: logo, the live site's main entries, Contact, the MyAcopia login and a Menu button.
   Colour follows the section underneath (data-tone, set in Motion). Hidden on scroll down, back on scroll up. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // One timeline: the navy sheet wipes down, then the groups rise in. Closing plays it in reverse.
  useEffect(() => {
    const el = menu.current; if (!el) return;
    const items = el.querySelectorAll(".menu-top, .menu-main li, .menu-col, .menu-brands");
    tl.current = gsap.timeline({ paused: true })
      .set(el, { visibility: "visible" })
      .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: .7, ease: "expo.inOut" })
      .fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .6, ease: "expo.out", stagger: .04 }, .35);
    tl.current.eventCallback("onReverseComplete", () => { gsap.set(el, { visibility: "hidden" }); });
    return () => { tl.current?.kill(); };
  }, []);

  useEffect(() => {
    const el = menu.current; if (!el || !tl.current) return;
    const root = document.documentElement;
    if (!open) { root.classList.remove("menu-open"); if (tl.current.progress() > 0) tl.current.timeScale(1.6).reverse(); return; }
    root.classList.add("menu-open");
    el.style.visibility = "visible"; // focusable straight away, before the wipe starts
    if (reducedMotion()) tl.current.progress(1); else tl.current.timeScale(1).play();
    const release = trapFocus(el, () => setOpen(false), trigger.current);
    return release;
  }, [open]);

  // Anchor links inside the menu close it; Motion's capture handler does the scrolling.
  const onMenuClick = (event: React.MouseEvent) => {
    const a = (event.target as Element).closest("a");
    if (a && (a.getAttribute("href") ?? "").startsWith("#")) setOpen(false);
  };

  return (
    <>
      <header className="header" data-tone="light">
        <a className="header-logo" href="#top" aria-label="Acopia, back to top"><Logo /></a>
        <nav className="header-nav" aria-label="Main">
          {nav.bar.map((l) => <Ext key={l.label} href={l.href}>{l.label}</Ext>)}
        </nav>
        <div className="header-end">
          <Ext className="plain" href={nav.contact.href}>{nav.contact.label}</Ext>
          <Ext className="header-pill" href={nav.myacopia.href}>{nav.myacopia.label}</Ext>
          <button ref={trigger} className="menu-btn" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
            Menu <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="menu" className="menu on-dark" ref={menu} role="dialog" aria-modal="true" aria-label="Site menu" onClick={onMenuClick}>
        <div className="menu-top">
          <a className="header-logo" href="#top" aria-label="Acopia, back to top"><Logo /></a>
          <button className="menu-close" type="button" onClick={() => setOpen(false)}>Close <i aria-hidden="true" /></button>
        </div>
        <div className="menu-body">
          <ul className="menu-main">
            <li><a href="#challenges">Your Challenges</a></li>
            <li><a href="#more-with-less">More with Less</a></li>
            <li><a href="#processes">Our Processes</a></li>
            <li><a href="#trusted">Who We Are</a></li>
            <li><a href="#insights">Insights</a></li>
            <li><Ext href={nav.contact.href}>Contact</Ext></li>
          </ul>
          <div className="menu-cols">
            {nav.retail.map((g) => (
              <div className="menu-col" key={g.title}>
                <h3><Ext href={g.href}>{g.title}</Ext></h3>
                {g.links.map((l) => <Ext key={l.href} href={l.href}>{l.label}</Ext>)}
              </div>
            ))}
            <div className="menu-col">
              <h3><Ext href={nav.about[0].href.replace("who-we-are/", "")}>About</Ext></h3>
              {nav.about.map((l) => <Ext key={l.href} href={l.href}>{l.label}</Ext>)}
            </div>
            <div className="menu-col">
              <h3><Ext href={nav.resources[0].href}>Resources</Ext></h3>
              {nav.resources.slice(1).map((l) => <Ext key={l.href} href={l.href}>{l.label}</Ext>)}
              <Ext href={nav.myacopia.href}>MyAcopia login</Ext>
            </div>
            <div className="menu-brands" aria-label="Acopia brands">
              {nav.brands.map((b) => (
                // eslint-disable-next-line @next/next/no-img-element
                <Ext key={b.name} href={b.href} aria-label={b.name}><img src={b.src} alt="" loading="lazy" /></Ext>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
