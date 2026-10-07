import Logo from "@/components/Logo";
import { Arrow, Ext } from "@/components/ui";
import { brandIcons } from "@/lib/brand-icons";
import { footer } from "@/lib/content";

/* kina.co's closing card: large wordmark, statement, link groups, socials. Deliberately no scroll reveals. */
export default function Footer() {
  return (
    <footer className="footer on-dark" data-tone="light">
      <div className="footer-top">
        <div>
          <div className="footer-mark"><Logo /></div>
          <p className="footer-statement">{footer.statement}</p>
        </div>
        <nav className="footer-cols" aria-label="Footer">
          {footer.groups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map((l) => <Ext key={l.label} href={l.href}>{l.label}</Ext>)}
            </div>
          ))}
        </nav>
        <div className="footer-side">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="footer-years" src="/brand/50-years-white.svg" alt="Acopia, 50 years" width={170} height={35} loading="lazy" />
          <div className="socials">
            {footer.socials.map((s) => (
              <Ext key={s.label} href={s.href} aria-label={`Acopia on ${s.label}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={brandIcons[s.icon]} /></svg>
              </Ext>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{footer.copyright}</span>
        <nav aria-label="Legal">
          {footer.legal.map((l) => <Ext key={l.label} href={l.href}>{l.label}</Ext>)}
          <a className="to-top" href="#top">Back to top <Arrow /></a>
        </nav>
      </div>
    </footer>
  );
}
